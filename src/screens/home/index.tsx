import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Alert } from 'react-native';
import { SearchBar } from '../../components/search-bar';
import { Accreditation, AccreditationText, Body, Container, GreyBar, Header, SessionTitle } from './styles';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { Speaker, SpeakerCard } from '../../components/speaker-cards';
import { CameraModal } from '../../components/camera-modal';
import { CameraModalAccreditation } from '../../components/camera-accreditations-modal';
import { regexText } from '../../utils';

export function Home() {
  const [searchText, setSearchText] = useState<string>('');
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isAccreditationCameraVisible, setIsAccreditationCameraVisible] = useState(false);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await api.get('/speakers/b213202f-bb2d-4b7a-bd6d-e7459694eba0');
        const data = await response.data;
        setSpeakers(data);
        setFilteredSpeakers(data);
      } catch (error) {
        console.error("Erro ao buscar palestrantes:", error);
      }
    };
    fetchSpeakers();
  }, []);

  const filterSpeakers = useCallback(() => {
    let filtered = speakers;

    if (searchText !== '') {
      const regexSearchText = regexText(searchText);
      filtered = filtered.filter(speaker =>
        regexText(speaker.presentationTitle).includes(regexSearchText) ||
        regexText(speaker.name).includes(regexSearchText)
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA.getTime() === dateB.getTime()) {
        const timeA = new Date(`1970-01-01T${a.startTime}`);
        const timeB = new Date(`1970-01-01T${b.startTime}`);
        return timeA.getTime() - timeB.getTime();
      }
      return dateA.getTime() - dateB.getTime();
    });

    setFilteredSpeakers(filtered);
  }, [speakers, searchText]);

  useEffect(() => {
    filterSpeakers();
  }, [searchText, filterSpeakers]);

  const handleQRCodeScan = async (participantId: string) => {
    try {
      await api.post(`/congresses/b213202f-bb2d-4b7a-bd6d-e7459694eba0/accreditations`, {
        participantId,
        paymentType: '2kg alimento'
      });
      Alert.alert('Credenciamento no congresso realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao realizar credenciamento:', error);
      Alert.alert('Erro ao realizar credenciamento');
    } finally {
      setIsAccreditationCameraVisible(false);
    }
  };

  const registerAttendance = async (participantId: string) => {
    if (!selectedSpeakerId) return;

    try {
      await api.post(`/attendance/speaker/${selectedSpeakerId}`, {
        participantId,
        type: 'SPEAKER'
      });
      Alert.alert('Presença na palestra registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar presença na palestra:', error);
      Alert.alert('Erro ao registrar presença na palestra');
    } finally {
      setIsCameraVisible(false);
    }
  };

  const openCameraForAttendance = (speakerId: string) => {
    setSelectedSpeakerId(speakerId);
    setIsCameraVisible(true);
  };

  return (
    <Container>
      <Header>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          style={{ margin: 16 }}
        />
        <GreyBar />
      </Header>

      <Body showsVerticalScrollIndicator={false}>
        <SessionTitle style={{ margin: 16 }}>Credenciamento</SessionTitle>
        <Accreditation onPress={() => setIsAccreditationCameraVisible(true)}>
          <AccreditationText>Registrar credenciamento</AccreditationText>
          <Feather name="chevron-right" size={24} color={'white'} />
        </Accreditation>

        <SessionTitle style={{ margin: 16 }}>Palestras</SessionTitle>

        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          {filteredSpeakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              onPress={() => openCameraForAttendance(speaker.id.toString())}
            />
          ))}
        </ScrollView>
      </Body>

      <CameraModal
        visible={isCameraVisible}
        onClose={() => setIsCameraVisible(false)}
        onQRCodeScanned={(data) => registerAttendance(data)}
      />

      <CameraModalAccreditation
        visible={isAccreditationCameraVisible}
        onClose={() => setIsAccreditationCameraVisible(false)}
        onQRCodeScanned={handleQRCodeScan}
      />
    </Container>
  );
}

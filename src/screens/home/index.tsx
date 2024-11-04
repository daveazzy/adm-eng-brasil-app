import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from '../../components/search-bar';
import { Accreditation, AccreditationText, Body, Container, GreyBar, Header, SessionTitle } from './styles';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { Speaker } from '../../components/speaker-cards';
import { SpeakerCard } from '../../components/speaker-cards';

function regexText(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function Home() {
  const [searchText, setSearchText] = useState<string>('');
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [filteredSpeakers, setFilteredSpeakers] = useState<Speaker[]>([]);

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
        <Accreditation>
          <AccreditationText>Registrar presença</AccreditationText>
          <Feather name="chevron-right" size={24} color={'white'} />
        </Accreditation>

        <SessionTitle style={{ margin: 16 }}>Presença</SessionTitle>

        <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
          {filteredSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </ScrollView>
      </Body>
    </Container>
  );
}

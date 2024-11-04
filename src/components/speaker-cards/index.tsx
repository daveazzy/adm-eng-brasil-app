import React from 'react';
import { Card, Header, SpeakerInfo, InfoContainer, Location, PresentationTitle, SpeakerImage, SpeakerName, Details } from './styles';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';

export interface Speaker {
    id: number;
    name: string;
    institution: string;
    photoUri: string;
    presentationTitle: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    congressId: string;
    administratorId: string;
    categoryId: string;
    categoryName?: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const formattedDate = format(new Date(speaker.date), 'dd/MM');

  return (
    <Card>
      <Header>
        <SpeakerInfo>
          <SpeakerImage source={{ uri: speaker.photoUri }} />
          <SpeakerName>{speaker.name}</SpeakerName>
        </SpeakerInfo>
        <Feather name="chevron-right" size={20} color="#1b388d" /> 
      </Header>
      <InfoContainer>
        <PresentationTitle>{speaker.presentationTitle}</PresentationTitle>
        <Details>{speaker.institution}</Details>
        <Details>{`${formattedDate} | ${speaker.startTime} - ${speaker.endTime}`}</Details>
        <Location>Local: {speaker.location}</Location>
      </InfoContainer>
    </Card>
  );
}

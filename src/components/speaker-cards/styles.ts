import styled from 'styled-components/native';

export const Card = styled.View`
  padding: 16px;
  margin: 8px 16px;
  border-radius: 8px;
  background-color: #F0F6FF;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.GREY_BORDER};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const SpeakerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const SpeakerImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
`;

export const SpeakerName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #1b388d;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const PresentationTitle = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
  font-family: ${({theme})=> theme.FONT_FAMILY.MEDIUM};
`;

export const Details = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 2px;
  font-family: ${({theme})=> theme.FONT_FAMILY.REGULAR}
`;

export const Location = styled.Text`
  font-size: 12px;
  color: #777;
  margin-top: 4px;
  font-family: ${({theme})=> theme.FONT_FAMILY.REGULAR}
`;

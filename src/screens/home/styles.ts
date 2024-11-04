import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme })=> theme.COLORS.WHITE};
`
export const Header = styled.View`
    background-color: ${({ theme }) => theme.COLORS.WHITE};
`
export const GreyBar = styled.View`
    height: 1px;

    margin: 0 16px;

    background-color: ${({ theme }) => theme.COLORS.GREY_10};
`
export const Body = styled.ScrollView`
    flex: 1;
`
export const SessionTitle = styled.Text`
    color: ${({ theme }) => theme.COLORS.BLUE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
`

export const Accreditation = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;

    height: 56px;
    margin: 0 16px 0 16px;

    border-radius: 12px;
    border-width: 0px;
    border-color: ${({ theme }) => theme.COLORS.BLUE};

    background-color: ${({ theme }) => theme.COLORS.BLUE};

    align-items: center;

    padding: 0 16px;
    justify-content: space-between;
`

export const AccreditationText = styled.Text`
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.MEDIUM};
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`
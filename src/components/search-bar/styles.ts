import styled from "styled-components/native";

export const Bar = styled.View`
    flex-direction: row;

    min-height: 52px;
    max-height: 52px;

    border-width: 1px;
    border-color: ${({ theme }) => theme.COLORS.GREY_BORDER};
    border-radius: 8px;

    gap: 12px;

    background-color: ${({ theme }) => theme.COLORS.GREY_INACTIVE};

    align-items: center;

    padding: 0 16px;
`;
export const Input = styled.TextInput`
    flex: 1;
    font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`
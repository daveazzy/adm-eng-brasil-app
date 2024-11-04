import React from "react";
import { Bar, Input } from "./styles";
import { FontAwesome } from '@expo/vector-icons'; 
import { useTheme } from "styled-components/native";
import { StyleProp, ViewStyle } from "react-native";

interface SearchBarProps {
    style?: StyleProp<ViewStyle>;
    value: string;
    onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ style, value, onChangeText, ...rest }) => {
    const { COLORS, FONT_FAMILY } = useTheme();

    return (
        <Bar style={style}>
            <FontAwesome 
                name="search" 
                size={20} 
                color={COLORS.GREY_INFO} 
            />
            <Input
                placeholder='Pesquisar evento'
                placeholderTextColor={COLORS.GREY_ACTIVE}
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
        </Bar>
    );
};
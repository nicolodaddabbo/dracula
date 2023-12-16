import { Pressable, Text } from "react-native";
import style from "./AppButton.module.css";
import styled from "styled-components";

const DIMENSIONS = {
    small: "5% 5%",
    medium: "10% 10%",
    big: "20% 20%"
}

const CustomPressable = styled.Pressable`
    border: 1px solid ${props => props.borderColor};
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${props => props.backgroundColor};
    padding: ${props => DIMENSIONS[props.dimension]};
`;

const CustomText = styled.Text`
    color: ${props => props.color};
    font-weight: bold;
`;

export default function AppButton({ dimension, color, borderColor, backgroundColor, shadowColor, text, onPress, width }) {
    return (
        <CustomPressable style={style.button} width={width} dimension={dimension} shadowColor={shadowColor} onPress={onPress} borderColor={borderColor} backgroundColor={backgroundColor}>
            <CustomText color={color} style={style.text}>{text}</CustomText>
        </CustomPressable>
    )
}
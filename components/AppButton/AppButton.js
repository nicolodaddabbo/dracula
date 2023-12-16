import { Pressable, Text } from "react-native";
import style from "./AppButton.module.css";
import styled from "styled-components";

const DIMENSIONS = {
    small: "5% 5%",
    medium: "10% 10%",
    big: "50% 50%"
}

const CustomPressable = styled.Pressable`
    border: 1px solid ${props => props.borderColor};
    background-color: ${props => props.backgroundColor};
    padding: ${props => DIMENSIONS[props.dimension]};
`;

export default function AppButton({ dimension, color, borderColor, backgroundColor, shadowColor, text, onPress }) {
    return (
        <CustomPressable style={style.button} dimension={dimension} shadowColor={shadowColor} onPress={onPress} borderColor={borderColor} backgroundColor={backgroundColor}>
            <Text style={style.text}>{text}</Text>
        </CustomPressable>
    )
}
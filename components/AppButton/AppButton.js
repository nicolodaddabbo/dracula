import { Button } from "react-native";
import style from "./AppButton.module.css";

export default function AppButton({dimensions, color, text, onPress}) {
    return (
        <Button
            style={style.button}
            title={text}
            color={color}
            onPress={onPress}
        />
    )
}
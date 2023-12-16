import { View } from "react-native";
import style from "./ButtonGrid.module.css";
import AppButton from "../AppButton/AppButton";

const LAYOUTS = {
    grid: "grid",
    list: "list",
}

export default function ButtonGrid({ buttons, layout }) {
    return (
        <View style={LAYOUTS[layout] == "grid" ? style.grid : style.list}>
            {buttons.map((button, index) => (
                <AppButton key={index} width={LAYOUTS[layout] == "grid" ? "45%" : "100%"} {...button.props} />
            ))}
        </View>
    );
}
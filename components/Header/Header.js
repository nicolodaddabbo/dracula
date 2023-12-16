import { View, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/Entypo";
import style from "./header.module.css";

export default function Header({ text, button }){
    const goToHomePage = () => {

    }

    return(
        <>
            <View style={style.header}>
                <Text style={style.text}>{ text }</Text>
                <FontAwesomeIcon name="home" size={30}></FontAwesomeIcon>
            </View>
        </>
    )
}
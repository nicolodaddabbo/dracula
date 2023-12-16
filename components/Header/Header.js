import { View, Text } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/Entypo";
import style from "./header.module.css";

export default function Header({ text, button, navigation }){
    const goToHomePage = () => {
        navigation.navigate("Home");
    }

    return(
        <>
            <View style={style.header}>
                <Text style={style.text}>{ text }</Text>
                {button ? <FontAwesomeIcon name="home" size={30} color="white" onPress={goToHomePage}></FontAwesomeIcon> : <></>}
            </View>
        </>
    )
}
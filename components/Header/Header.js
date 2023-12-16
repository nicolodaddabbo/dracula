import { View, Text } from "react-native";
import { Icon } from "react-native-vector-icons/AntDesign";

export default function Header({ text, button }){
    const goToHomePage = () => {

    }

    return(
        <>
            <View style={style.header}>
                <Text style={style.text}>{ text }</Text>
                { button ? <Icon name="home" size={30} onPress={goToHomePage} style={style.icon}/> : <></> }
            </View>
        </>
    )
}
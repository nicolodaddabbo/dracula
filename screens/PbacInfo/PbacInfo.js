import { StyleSheet, View, Text } from 'react-native';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

export default function PbacInfo({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>

            <ButtonGrid layout="grid" buttons={[
                {
                    props: {
                        text: "NEXT",
                        onPress: () => navigation.navigate("Pbac"),
                        color: "red",
                        borderColor: "black",
                        backgroundColor: "white",
                        dimension: "small"
                    }
                }
            ]}
            />
        </View>
    )
}

const text = "Pictorial Blood Loss Assessment Charts (PBACs) stand as the predominant method for evaluating menstrual blood loss. Our innovative app simplifies this process for you. Each time you visit the bathroom, effortlessly assess your bleeding by opening the app. Choose the appropriate flow level—be it low, medium, or high. For added convenience, you can even allow the app to gauge the amount of bleeding by capturing a photo of your protection.";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5%",
        paddingTop: "50%",
        backgroundColor: "#F60202D4"
    },
    text: {
        color: "#FFF",
        fontSize: 20,
    }
});
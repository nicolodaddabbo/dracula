import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import AppButton from '../../components/AppButton/AppButton';

export default function Result({ navigation, route: { params: { resultText } } }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="RESULT" button={false} />
            </View>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text>{resultText}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton
                        text="DONE"
                        onPress={() => navigation.navigate("Home")}
                        color="black"
                        borderColor="red"
                        backgroundColor="white"
                        dimension="small"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "100%",
        height: "90%",
        display: "flex",
        alignItems: "left",
        justifyContent: "top",
        padding: "5%"
    },
    textContainer: {
        width: "100%",
        flex: 1,
        alignItems: "left",
        justifyContent: "top",
    },
    buttonContainer: {
        width: "100%",
        height: "20%",
        alignItems: "center",
        justifyContent: "center",
    }
});
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

export default function Day({ navigation, route: { params: { dayNumber } } }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text={"DAY " + dayNumber} button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>How much blood?</Text>
                <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "1",
                            onPress: () => navigation.navigate("Result", { resultText: "Lorem ipsum" }),
                            color: "red",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "medium"
                        }
                    },
                    {
                        props: {
                            text: "2",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "red",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "medium"
                        }
                    },
                    {
                        props: {
                            text: "3",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "red",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "medium"
                        }
                    }
                ]} />
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
        alignItems: "center",
        justifyContent: "center",
        padding: "5%"
    }
});
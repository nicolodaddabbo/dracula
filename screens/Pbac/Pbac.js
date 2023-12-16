import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

export default function Pbac({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="PBAC TEST" button={false} />
            </View>
            <View style={styles.container}>
                <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "TAKE TEST",
                            onPress: () => navigation.navigate("FirstTimeChoice"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    },
                    {
                        props: {
                            text: "INFO",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    },
                    {
                        props: {
                            text: "PREVIOUS RESULTS",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
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
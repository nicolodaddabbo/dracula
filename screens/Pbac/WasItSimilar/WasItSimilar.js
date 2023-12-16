import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

export default function WasItSimilar({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text={"PBAC TEST"} button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Was your last 2 cycles similar?</Text>
                <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "YES",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "NO",
                            onPress: () => navigation.navigate("Pbac"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
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
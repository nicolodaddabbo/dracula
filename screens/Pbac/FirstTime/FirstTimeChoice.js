import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

export default function FistTimeChoice({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="PBAC TEST" button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>What do you use?</Text>
                <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "TOWEL",
                            onPress: () => navigation.navigate("Day", { dayNumber: 1}),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "TAMPON",
                            onPress: () => navigation.navigate("Day", { dayNumber: 1}),
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
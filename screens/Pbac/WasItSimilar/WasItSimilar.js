import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

const updateResults = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("INSERT INTO pbac_results (result) SELECT result FROM pbac_results ORDER BY id LIMIT 1; ", []);
                tx.executeSql("delete from pbac");
                tx.executeSql("select * from pbac", [], (_, { rows }) => {
                    console.log(JSON.stringify(rows));
                    resolve("Transaction completed");
                });
            },
            () => {
                console.log("error");
                reject("Transaction failed");
            },
            () => {
                console.log("deleted");
            }
        );
    });
};

export default function WasItSimilar({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text={"PBAC TEST"} button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>Was your last 2 cycles similar?</Text>
                <ButtonGrid layout="list" buttons={[
                    {
                        props: {
                            text: "YES",
                            onPress: () => {
                                updateResults();
                                navigation.navigate("Pbac");
                            },
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
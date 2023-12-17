import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

const clearData = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from samanta");
                tx.executeSql("select * from samanta", [], (_, { rows }) => {
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

export default function Samanta({ navigation }) {
    return (
        <>
            <View style={styles.headerContainer}>
                <Header text="SAMANTA TEST" button={true} navigation={navigation}/>
            </View>
            <View style={styles.container}>
            <ButtonGrid layout="list" buttons={[
                    {
                        props: {
                            text: "TAKE TEST",
                            onPress: () => {
                                clearData().then(() => {
                                    navigation.navigate("Questions");
                                });
                            },
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    },
                    {
                        props: {
                            text: "INFO",
                            onPress: () => navigation.navigate("SamantaInfo"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    },
                    // {
                    //     props: {
                    //         text: "PREVIOUS RESULT",
                    //         onPress: () => navigation.navigate("Result", { resultText: "You're ok" }), // TODO: change this to the actual result
                    //         color: "black",
                    //         borderColor: "red",
                    //         backgroundColor: "white",
                    //         dimension: "small"
                    //     }
                    // }
                ]} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
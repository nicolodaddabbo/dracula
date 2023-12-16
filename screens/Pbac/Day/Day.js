import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';
import { useState, useEffect } from 'react';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

const onPress = (navigation, dayNumber, protection, level) => {
    db.transaction(
        (tx) => {
            tx.executeSql("update pbac set " + level + " = " + level + " + 1 where day = ?", [dayNumber]);
            tx.executeSql("select * from pbac", [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        },
        null,
        () => navigation.navigate("Pbac")
    );
}

export default function Day({ navigation, route: { params: { dayNumber, protection } } }) {
    const [data, setData] = useState(null); 
    const [nextScreen, setNextScreen] = useState("Pbac");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from pbac where day=?;`,
                [dayNumber],
                (_, { rows: { _array } }) => setData(_array)
            );
        });
    }, []);
    
    useEffect(() => {
        if (!loading) {
            console.log("[Day " + dayNumber + "] data: ");
            console.log(data);
        }
    }, [data]);


    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text={"DAY " + dayNumber} button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>How much blood?</Text>
                <ButtonGrid layout="list" buttons={[
                    {
                        props: {
                            text: "light " + protection,
                            onPress: () => onPress(navigation, dayNumber, protection, "light"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "medium"
                        }
                    },
                    {
                        props: {
                            text: "medium " + protection,
                            onPress: () => onPress(navigation, dayNumber, protection, "medium"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "medium"
                        }
                    },
                    {
                        props: {
                            text: "heavy " + protection,
                            onPress: () => onPress(navigation, dayNumber, protection, "heavy"),
                            color: "black",
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
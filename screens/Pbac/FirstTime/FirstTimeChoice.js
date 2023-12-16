import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';
import { useState, useEffect } from 'react';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

export default function FistTimeChoice({ navigation }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [day, setDay] = useState(1);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from pbac;`,
                null,
                (_, { rows: { _array } }) => {
                    setData(_array);
                    setLoading(false);
                }
            );
        });
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("[FirstTimeChoice] data: ");
            console.log(data);
            let day = 1;
            let startDate = new Date();
            data.forEach((element) => {
                if (element.day >= day) {
                    day = element.day;
                    startDate = new Date(element.startDate);
                }
            });
            console.log(startDate.getUTCDate())
            if (startDate.getUTCDate() < new Date().getUTCDate()) {
                console.log("new day!");
                console.log("inserting");
                db.transaction(
                    (tx) => {
                        tx.executeSql("insert into pbac (day, light, medium, heavy, startDate) values (?, ?, ?, ?, DateTime('now'))", [day, 0, 0, 0]);
                        tx.executeSql("select * from pbac", [], (_, { rows }) =>
                            console.log(JSON.stringify(rows))
                        );
                    },
                    () => console.log("error"),
                    () => console.log("inserted")
                );
                day++;
            }
            setDay(day);
        }
    }, [loading]);

    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="PBAC TEST" button={false} />
            </View>
            <View style={styles.container}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>What do you use?</Text>
                <ButtonGrid layout="list" buttons={[
                    {
                        props: {
                            text: "TOWEL",
                            onPress: () => navigation.navigate("Day", { dayNumber: day, protection: "towel"}),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "TAMPON",
                            onPress: () => navigation.navigate("Day", { dayNumber: day, protection: "tampon"}),
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
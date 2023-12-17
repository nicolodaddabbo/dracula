import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

import * as ImagePicker from 'expo-image-picker';

export default function FistTimeChoice({ navigation }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [day, setDay] = useState(1);
    const [capturedImage, setCapturedImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleOpenImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
            quality: 1,
        });

        if (!result.canceled) {
            setCapturedImage(result.base64);
        } else {
            alert('You did not select any image.');
        }
    };

    const callApi = async () => {
        const base64Image = capturedImage;
        axios({
            method: 'POST',
            url: 'http://192.168.248.151:8000/todo',
            params: {
                img: base64Image
            },
            data: base64Image,
            headers: {
                // define your headers
            }
        }).then(function (response) {
            console.log("response")
            console.log(response.data);
            setResult(response.data);
        }).catch(function (error) {
            console.log(error.message);
            return null;
        });
    };

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
                            text: "TAKE A PICTURE",
                            onPress: () => {
                                handleOpenImagePicker().then(() => {
                                    callApi().then((response) => {
                                        db.transaction(
                                            (tx) => {
                                                tx.executeSql("update pbac set " + result + " = " + result + " + 1 where day = ?", [day]);
                                                tx.executeSql("select * from pbac", [], (_, { rows }) =>
                                                    console.log(JSON.stringify(rows))
                                                );
                                            },
                                            null,
                                            () => navigation.navigate("Pbac")
                                        );
                                    })
                                })
                                //navigation.navigate("Day", { dayNumber: day, protection: "towel" })
                            },
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "TOWEL",
                            onPress: () => navigation.navigate("Day", { dayNumber: day, protection: "towel" }),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "TAMPON",
                            onPress: () => navigation.navigate("Day", { dayNumber: day, protection: "tampon" }),
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
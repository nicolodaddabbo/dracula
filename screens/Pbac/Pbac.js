import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('database');

const computeResult = (data) => {
    return new Promise((resolve, reject) => {
        let result = 0;

        db.transaction((tx) => {
            tx.executeSql(
                `select * from pbac;`,
                () => {
                    console.log("error Pbac");
                    reject("Error executing SQL");
                },
                (_, { rows: { _array } }) => {
                    console.log("computeResult");
                    console.log(_array);
                    _array.forEach((element) => {
                        result += element.light + 5 * element.medium + 10 * element.heavy;
                    });
                    resolve(result);
                }
            );
        });
    });
};

const updateResults = (result) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into pbac_results (result) values (?)", [result]);
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

const removeResults = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("delete from pbac_results");
                tx.executeSql("select * from pbac_results", [], (_, { rows }) => {
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


const checkIfTestIsOver = () => {
    return new Promise((resolve, reject) => {
        let result = 0;
        console.log("weo");

        db.transaction((tx) => {
            tx.executeSql(
                `select * from pbac_results;`,
                () => {
                    console.log("error Pbac checkIfTestIsOver");
                    reject("Error executing SQL");
                },
                (_, { rows: { _array } }) => {
                    console.log("checkIfTestIsOver");
                    console.log(_array);
                    let count = 0;
                    _array.forEach((element) => {
                        result += element.result;
                        count++;
                    });
                    resolve([result, count]);
                }
            );
        });
    });
};

export default function Pbac({ navigation }) {
    const [data, setData] = useState(null);
    const [newTest, setNewTest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            db.transaction((tx) => {
                tx.executeSql(
                    `select * from pbac;`,
                    () => console.log("error Pbac"),
                    (_, { rows: { _array } }) => {
                        setData(_array);
                        setLoading(false);
                    }
                );
            });
        }
    }, [isFocused]);

    useEffect(() => {
        if (!loading) {
            console.log("[Pbac] data: ");
            console.log(data);
            if (!data.lenght) { // whyyyyyy
                console.log("inserting");
                db.transaction(
                    (tx) => {
                        tx.executeSql("insert into pbac (day, light, medium, heavy, startDate) values (?, ?, ?, ?, DateTime('now'))", [1, 0, 0, 0]);
                        tx.executeSql("select * from pbac", [], (_, { rows }) =>
                            console.log(JSON.stringify(rows))
                        );
                    },
                    () => console.log("error"),
                    () => console.log("inserted")
                );
            }
            setLoading(true);
        }

    }, [loading]);

    useEffect(() => {
        if (data && data.length) {
            setNewTest(false);
        }
    }, [data, loading]);

    const defaultButtons = [
        {
            props: {
                text: newTest ? "TAKE TEST" : "CONTINUE TEST",
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
                onPress: () => navigation.navigate("PbacInfo"),
                color: "black",
                borderColor: "red",
                backgroundColor: "white",
                dimension: "small"
            }
        },
        {
            props: {
                text: "PREVIOUS RESULTS",
                onPress: () => navigation.navigate("Result", { resultText: "You're ok" }), // TODO: change this to the actual result
                color: "black",
                borderColor: "red",
                backgroundColor: "white",
                dimension: "small"
            }
        }];

    const [buttons, setButtons] = useState(defaultButtons);

    useEffect(() => {
        if (!newTest) {
            setButtons([
                ...defaultButtons,
                {
                    props: {
                        text: "CYCLE TERMINATED",
                        onPress: () => {
                            computeResult(data).then((result) => {
                                console.log("result: " + result);
                                updateResults(result).then((a) => {
                                    checkIfTestIsOver().then((results) => {
                                        if (results[1] < 3) {
                                            navigation.navigate("Result", { resultText: "Partial result = " + results[0] + " (" + results[1] + "/3 cycles)" });
                                        } else {
                                            removeResults().then(() => {
                                                navigation.navigate("Result", { resultText: results[0] <= 100 ? "OK" : "BAD"});
                                            })
                                        }
                                    })
                                })
                                
                            })
                        },
                        color: "black",
                        borderColor: "red",
                        backgroundColor: "white",
                        dimension: "small"
                    }
                }
            ]);
        }
    }, [newTest]);

    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="PBAC TEST" button navigation={navigation} />
            </View>
            <View style={styles.container}>
                <ButtonGrid layout="list" buttons={buttons} />
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
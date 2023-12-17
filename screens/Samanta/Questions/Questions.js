import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import AppButton from '../../../components/AppButton/AppButton';
import React, { useState, useEffect } from 'react';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';
import * as SQLite from "expo-sqlite";

const questions = [
    "Does your period usually last for more than 7 days?",
    "Do you have 3 or more days of heavier bleeding during your menstruation?",
    "In general, does your period feel particularly bothersome due to the amount of blood?",
    "On some of the days of heavier bleeding, would you stain your clothes at night, or would you stain them if you didn't use double protection or change during the night?",
    "During the days of heavier bleeding, are you concerned about staining the seat of your chair, sofa, etc.?",
    "In general, during heavy bleeding, do you avoid certain activities, like trips or leisure plans, because you need to change protection frequently?"
];

const db = SQLite.openDatabase('database');

const insertAnswer = (questionNumber, answer) => {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into samanta (question, answer) values (?, ?)", [questionNumber, answer]);
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

const computeResult = () => {
    return new Promise((resolve, reject) => {
        let result = 0;

        db.transaction((tx) => {
            tx.executeSql(
                `select * from samanta;`,
                () => {
                    console.log("error Samanta");
                    reject("Error executing SQL");
                },
                (_, { rows: { _array } }) => {
                    console.log("computeResult");
                    console.log(_array);
                    _array.forEach((element) => {
                        result += element.answer == "Yes" ? 1 : 0;
                    });
                    resolve(result);
                }
            );
        });
    });
};

export default function Questions({ navigation }) {
    const [questionNumber, setQuestionNumber] = useState(0);

    useEffect(() => {
        if (questionNumber >= questions.length) {
            computeResult().then((result) => {
                console.log("result");
                console.log(result);
                navigation.navigate("Result", { resultText: result > 3 ? "You're not ok" : "You're ok" }); // TODO: change this to the actual result
            });
        }
    }, [questionNumber]);

    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text={"QUESTION " + (questionNumber + 1)} button={true} navigation={navigation} />
            </View>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text>{questions[questionNumber]}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonGrid
                        layout="grid"
                        buttons={[
                            {
                                props: {
                                    text: "Yes",
                                    onPress: () => {
                                        insertAnswer(questionNumber, "Yes").then(() => {
                                            setQuestionNumber(questionNumber + 1)
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
                                    text: "No",
                                    onPress: () => {
                                        insertAnswer(questionNumber, "No").then(() => {
                                            setQuestionNumber(questionNumber + 1)
                                        });
                                    },
                                    color: "black",
                                    borderColor: "red",
                                    backgroundColor: "white",
                                    dimension: "small"
                                }
                            }
                        ]}
                    />
                </View>
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
        alignItems: "left",
        justifyContent: "top",
        padding: "5%"
    },
    textContainer: {
        width: "100%",
        flex: 1,
        alignItems: "left",
        justifyContent: "top",
    },
    buttonContainer: {
        width: "100%",
        height: "10%",
    }
});
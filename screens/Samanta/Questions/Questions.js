import { View, Text, StyleSheet } from 'react-native';
import Header from '../../../components/Header/Header';
import AppButton from '../../../components/AppButton/AppButton';
import React, { useState } from 'react';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

const questions = [
    "Does your period usually last for more than 7 days?",
    "Do you have 3 or more days of heavier bleeding during your menstruation?",
    "In general, does your period feel particularly bothersome due to the amount of blood?",
    "On some of the days of heavier bleeding, would you stain your clothes at night, or would you stain them if you didn't use double protection or change during the night?",
    "During the days of heavier bleeding, are you concerned about staining the seat of your chair, sofa, etc.?",
    "In general, during heavy bleeding, do you avoid certain activities, like trips or leisure plans, because you need to change protection frequently?"
]

export default function Questions({ navigation }) {
    const [questionNumber, setQuestionNumber] = useState(0);

    if (questionNumber >= questions.length) {
        navigation.navigate("Result", { resultText: "You're ok" }); // TODO: change this to the actual result
    }

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
                                    onPress: () => setQuestionNumber(questionNumber + 1),
                                    color: "black",
                                    borderColor: "red",
                                    backgroundColor: "white",
                                    dimension: "small"
                                }
                            },
                            {
                                props: {
                                    text: "No",
                                    onPress: () => setQuestionNumber(questionNumber + 1),
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
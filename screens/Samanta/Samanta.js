import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header/Header';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from 'react';

const db = SQLite.openDatabase('database');

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
                                    db.transaction(tx => {
                                    tx.executeSql('DELETE FROM samanta', null);
                                    })
                                navigation.navigate("Questions")
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
                    {
                        props: {
                            text: "PREVIOUS RESULT",
                            onPress: () => navigation.navigate("SamantaResult"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    }
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
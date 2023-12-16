import { View, Text, StyleSheet } from 'react-native';
import AppButton from '../../components/AppButton/AppButton';
import Header from '../../components/Header/Header';

export default function Samanta({ navigation }) {
    return (
        <>
            <View style={styles.headerContainer}>
                <Header text="SAMANTA TEST" button={false} />
            </View>
            <View style={styles.container}>
                <Text>Samanta</Text>
                <AppButton
                    text="Click me!"
                    onPress={() => navigation.navigate("Questions")}
                    color="black"
                    borderColor="red"
                    backgroundColor="white"
                    dimension={"small"}
                />
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
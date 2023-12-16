import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header/Header';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

export default function Home({ navigation }) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Header text="Dracula" button={false} />
            </View>
            <View style={styles.container}>
                <ButtonGrid layout="list" buttons={[
                    {
                        props: {
                            text: "SAMANTA TEST",
                            onPress: () => navigation.navigate("Samanta"),
                            color: "black",
                            borderColor: "red",
                            backgroundColor: "white",
                            dimension: "big"
                        }
                    },
                    {
                        props: {
                            text: "PBAC TEST",
                            onPress: () => navigation.navigate("PbacInfo"),
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
};

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
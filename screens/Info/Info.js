import { StyleSheet, View, Text } from 'react-native';
import AppButton from '../../components/AppButton/AppButton';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

export default function Info({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            
            <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "START TEST",
                            onPress: () => navigation.navigate("SamantaTest"),
                            color: "red",
                            borderColor: "black",
                            backgroundColor: "white",
                            dimension: "small"
                        }
                    }
               ]}
            />
        </View>
    )
}

const text = "Samanta Info";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5%",
        paddingTop: "50%",
        backgroundColor: "#F60202D4"
    },
    text: {
        color: "#FFF",
    }
});
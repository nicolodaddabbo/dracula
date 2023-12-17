import { StyleSheet, View, Text } from 'react-native';
import ButtonGrid from '../../../components/ButtonGrid/ButtonGrid';

export default function SamantaInfo({ navigation }) {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            
            <ButtonGrid layout="grid" buttons={[
                    {
                        props: {
                            text: "NEXT",
                            onPress: () => navigation.navigate("Samanta"),
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

const text = "This questionaire developed with the objective of identifying women of reproductive age that are experiencing Heavy Menstrual Bleeding in Spain. It was developed by assessing and identifying 6 items deemed the most crucial factors in discriminating between women with and without HMB. The questionnaire demonstrated a sensitivity of 86.7%, a specificity of 89.5%, and an 87.9% accuracy in classification.";

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
        fontSize: 20,
    }
});
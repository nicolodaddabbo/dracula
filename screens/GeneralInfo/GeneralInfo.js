import { StyleSheet, View, Text } from 'react-native';
import ButtonGrid from '../../components/ButtonGrid/ButtonGrid';

export default function SamantaInfo({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>

            <ButtonGrid layout="grid" buttons={[
                {
                    props: {
                        text: "NEXT",
                        onPress: () => navigation.navigate("SamantaInfo"),
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

const text = "Heavy menstrual bleeding (HMB) is the excessive loss of menstrual blood that interferes with the quality of life. It is an under-diagnosed and under-treated disorder. This issue, aside from preventing you from living your life to the fullest, can also pose a serious health threat. It can lead to anemia and may serve as a symptom of an underlying health problem or disease, such as cancer.";

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
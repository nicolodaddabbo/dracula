import { StyleSheet, View } from 'react-native';
import AppButton from './components/AppButton/AppButton';

export default function App() {
  return (
    <View style={styles.container}>
      <AppButton
        color="red"
        text="Click me!"
        onPress={() => console.log("Button pressed!")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

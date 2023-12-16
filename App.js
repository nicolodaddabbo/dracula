import { StyleSheet, View } from 'react-native';
import AppButton from './components/AppButton/AppButton';
import Header  from './components/Header/Header';

export default function App() {
  return (
    <View>
      <View style={styles.headerContainer}>
        <Header text="Header" button={false}/>
      </View>
    
      <View style={styles.container}>
        <AppButton
          text="Click me!"
          onPress={() => console.log("Button pressed!")}
          color="red"
          borderColor="red"
          backgroundColor="white"
          dimension={"small"}
        />
      </View>
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

  headerContainer: {
    flex: 1,
    alignItems: 'flex-start'
  }
});

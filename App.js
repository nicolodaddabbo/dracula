import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import Samanta from './screens/Samanta/Samanta';
import Pbac from './screens/Pbac/Pbac';
import FirstTimeChoice from './screens/Pbac/FirstTime/FirstTimeChoice';
import Day from './screens/Pbac/Day/Day';
import WasItSimilar from './screens/Pbac/WasItSimilar/WasItSimilar';
import Result from './screens/Result/Result';
import Questions from './screens/Samanta/Questions/Questions';
import SamantaInfo from './screens/Samanta/SamantaInfo/SamantaInfo';
import GeneralInfo from './screens/GeneralInfo/GeneralInfo';
import PbacInfo from './screens/PbacInfo/PbacInfo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GeneralInfo" component={GeneralInfo} options={{ headerShown: false }} />
        <Stack.Screen name="SamantaInfo" component={SamantaInfo} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Samanta" component={Samanta} options={{ headerShown: false }} />
        <Stack.Screen name="Pbac" component={Pbac} options={{ headerShown: false }} />
        <Stack.Screen name="PbacInfo" component={PbacInfo} options={{ headerShown: false }} />
        <Stack.Screen name="FirstTimeChoice" component={FirstTimeChoice} options={{ headerShown: false }} />
        <Stack.Screen name="Day" component={Day} options={{ headerShown: false }} />
        <Stack.Screen name="WasItSimilar" component={WasItSimilar} options={{ headerShown: false }} />
        <Stack.Screen name="Result" component={Result} options={{ headerShown: false }} />
        <Stack.Screen name="Questions" component={Questions} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

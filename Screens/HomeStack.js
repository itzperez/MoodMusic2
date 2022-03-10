import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LocationInformation from './LocationInformation';
import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AlesundScreen" component={LocationInformation}
        options={{
          title: 'Profile',
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen name="SanFranciscoScreen" component={LocationInformation} />
      <Stack.Screen name="LakeLouiseScreen" component={LocationInformation} />

    </Stack.Navigator>
  );
}

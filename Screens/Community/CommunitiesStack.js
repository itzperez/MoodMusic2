import { createStackNavigator } from '@react-navigation/stack';
import CommunitiesScreen from './CommunitiesScreen.js';
import CommunityScreen from './CommunityScreen.js';
import JoinCommunityScreen from './JoinCommunityScreen.js';
import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function CommunitiesStack() {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="CommunitiesScreen" component={CommunitiesScreen} />


      <Stack.Screen name="JoinCommunityScreen" component={JoinCommunityScreen} />


      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />

    </Stack.Navigator>
  );
}

//
// <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
//   options={{
//     title: 'Profile',
//     ...TransitionPresets.ModalPresentationIOS,
//   }}
// />

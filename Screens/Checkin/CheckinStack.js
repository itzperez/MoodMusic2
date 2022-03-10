import { createStackNavigator } from '@react-navigation/stack';
import MoodScreen from './MoodScreen.js';
import SongScreen from './SongScreen.js';
import SongSelectScreen from './SongSelectScreen.js';
import ShareSongScreen from './ShareSongScreen.js';

import { TransitionPresets } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function CheckinStack() {
  return (
    <Stack.Navigator
      screenOptions= {() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="MoodScreen" component={MoodScreen} />
      <Stack.Screen name="SongScreen" component={SongScreen} />
      <Stack.Screen name="SongSelectScreen" component={SongSelectScreen}
        options={{
          title: 'Profile',
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <Stack.Screen name="ShareSongScreen" component={ShareSongScreen} />

    </Stack.Navigator>
  );
}

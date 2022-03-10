import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signin from './Signin.js';
import Signup from './Signup.js';
import { useState } from 'react';

import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function OnboardingStack({callbackApp}) {
    const callbackOnboardingStack = () => {
        callbackApp();
    }

  return (
    <NavigationContainer>
        <Stack.Navigator >
              <Stack.Screen name='Signin' options={{ headerShown: false }}>
                {(props) => <Signin {...props} callbackOnboardingStack={callbackOnboardingStack} />}
              </Stack.Screen>
              <Stack.Screen name='Signup' options={{ headerShown: false }}>
                {(props) => <Signup {...props} callbackOnboardingStack={callbackOnboardingStack} />}
              </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>

  );
}

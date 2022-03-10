import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from '../../firebase.js';
import { doc, setDoc } from "firebase/firestore";

import {
  useFonts,
  Rubik_300Light,
  Rubik_300Light_Italic,
  Rubik_400Regular,
  Rubik_400Regular_Italic,
  Rubik_500Medium,
  Rubik_500Medium_Italic,
  Rubik_700Bold,
  Rubik_700Bold_Italic,
  Rubik_900Black,
  Rubik_900Black_Italic
} from '@expo-google-fonts/rubik';
import AppLoading from 'expo-app-loading';

export default function Signin({callbackOnboardingStack}) {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    let [fontsLoaded] = useFonts({
      Rubik_300Light,
      Rubik_300Light_Italic,
      Rubik_400Regular,
      Rubik_400Regular_Italic,
      Rubik_500Medium,
      Rubik_500Medium_Italic,
      Rubik_700Bold,
      Rubik_700Bold_Italic,
      Rubik_900Black,
      Rubik_900Black_Italic
    });

    if (!fontsLoaded) {
      return <AppLoading />;
    }

    const navigation = useNavigation();

    const loginUser = async () => {
      const auth = getAuth();

      if (email.length === 0 || password.length === 0) {
        return;
      }

      try {
        let userCredential = await signInWithEmailAndPassword(auth, email, password);
        let uid = userCredential.user.uid;
        callbackOnboardingStack();

      } catch (err) {
        console.log(err);
      }
    }

    return (
        <View style={styles.container}>
            <View style={{flex: .15}}/>

            <View style={{flex: .25, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{height: 100, width: 100}} source={require('../../assets/Images/musical-note.png')} />
                <Text style={{fontSize: 42, fontFamily: 'Rubik_700Bold', color: '#7044A9'}}>
                    Mood Music
                </Text>
                <Text style={{fontSize: 18, fontFamily: 'Rubik_400Regular'}}>
                    Feel, Share, Connect
                </Text>

            </View>

            <View style={{flex: .3, width: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder='Email'
                  placeholderTextColor='white'
                  value={email}
                  onChangeText={onChangeEmail}
                />
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder='Password'
                  placeholderTextColor='white'
                  value={password}
                  onChangeText={onChangePassword}
               />

            </View>

            <View style={{flex: .1, alignItems: 'center', width: '100%'}}>
                <TouchableOpacity onPress={loginUser} style={{flex: .7, paddingLeft: 15, paddingRight: 15}}>
                    <Text style={{fontSize: 26, fontFamily: 'Rubik_400Regular', color: '#7044A9'}}>
                        Log in
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex: .1, alignItems: 'center', width: '100%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{flex: .7, paddingLeft: 15, paddingRight: 15}}>
                    <Text style={{fontSize: 24, fontFamily: 'Rubik_400Regular', color: '#e9497e'}}>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex: .1}}/>

        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 55,
    backgroundColor: '#3B8EA5',
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
  },
});

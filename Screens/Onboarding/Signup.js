import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-screen';
import { useNavigation } from '@react-navigation/native';
import Back from '../../assets/Images/Icons/back-svgrepo-com.svg'

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

import { db } from '../../firebase.js';
import { doc, getDoc, setDoc, collection} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({callbackOnboardingStack}) {
    const [readDescription, toggle] = useState(false);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
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

    const goBack = () => {
        navigation.navigate('Signin');
    }

    const hasReadDescription = () => {
        toggle(true);
    }

    const registerUser = async () => {
      const auth = getAuth();

      console.log('auth', auth)

      if (email.length === 0 || password.length === 0) {
        return;
      }

      try {
        let userCredential = await createUserWithEmailAndPassword(auth, email, password);
        let uid = userCredential.user.uid;
        await setDoc(doc(db, "users", uid), {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        });

        callbackOnboardingStack();

      } catch (err) {
        console.log(err);
      }
    }

    const pages = [
            {
                title: 'Welcome',
                subtitle: 'to the Mood Music app',
                action: {
                    title: "Go back",
                    onPress: goBack,
                }
            },
            {
                title: 'Why Mood Music?',
                subtitle: 'Expressing our feelings can be challenging, leaving us disconnected from others',
            },
            {
                title: "Share with ease",
                subtitle: "Mood Music harnesses the expressive power of music to foster emotionally supportive interactions",
                action: {
                    title: "Make an account",
                    onPress: hasReadDescription,
                }
            }
    ];

    // <Back width={30} height={30} fill={'#FFFFFF'}/>
    let contentDisplayed = null;

    if (!readDescription) {
        contentDisplayed = (<Onboarding backgroundImage={require('../../assets/icon.png')} pages={pages} />)
    } else {
        contentDisplayed = (
            <View style={styles.container}>
                <View style={{flex: .1, flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={{marginLeft: 10, paddingBottom: 7, flex: .2, height: '100%', justifyContent: 'flex-end'}}>
                        <Back width={30} height={30} fill={'black'}/>
                    </TouchableOpacity>
                    <View style={{flex: .8, flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Image style={{height: 40, width: 40}} source={require('../../assets/Images/musical-note.png')} />
                        <Text style={{fontSize: 32, fontFamily: 'Rubik_700Bold', color: '#7044A9'}}> Mood Music </Text>
                    </View>
                </View>

                <View style={{flex:.1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontFamily: 'Rubik_700Bold', color: '#7044A9'}}> Feel, Share, Connect </Text>

                </View>

                <View style={{flex: .8, width: '100%', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        placeholder='First name'
                        placeholderTextColor='white'
                        value={firstName}
                        onChangeText={onChangeFirstName}
                    />
                    <TextInput
                      style={styles.input}
                      autoCapitalize='none'
                      placeholder='Last Name'
                      placeholderTextColor='white'
                      value={lastName}
                      onChangeText={onChangeLastName}
                   />
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

                 <Button color='#e9497e' title='Create account' onPress={registerUser}/>

                </View>
            </View>
        )
    }

    return contentDisplayed;
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

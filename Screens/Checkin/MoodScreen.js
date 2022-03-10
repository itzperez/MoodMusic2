import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, ImageBackground, TouchableOpacity, Button} from 'react-native';
import Images from '../../assets/Images';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Happy from '../../assets/Images/Feelings/happy.svg';
import Excited from '../../assets/Images/Feelings/excited.svg';
import Lonely from '../../assets/Images/Feelings/lonely.svg';
import Sad from '../../assets/Images/Feelings/sad.svg';
import Angry from '../../assets/Images/Feelings/angry.svg';
import Anxious from '../../assets/Images/Feelings/anxious.svg';
import AppLoading from 'expo-app-loading';
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
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase.js';

const emotions = [
  {
    id: 1,
    feeling: 'HAPPY',
    emoji: <Happy/>,
  },
  {
    id: 2,
    feeling: 'SAD',
    emoji: <Sad/>,
  },
  {
    id: 3,
    feeling: 'CREATIVE',
    emoji: <Image source={Images.creative} style={{height: 43, width: 43, tintColor: 'white'}} />,

  },
  {
    id: 4,
    feeling: 'ANXIOUS',
    emoji: <Anxious/>,
  },
  {
    id: 5,
    feeling: 'EXCITED',
    emoji: <Excited/>,
  },
  {
    id: 6,
    feeling: 'ANGRY',
    emoji: <Angry/>,
  },
  {
    id: 7,
    feeling: 'CRUSHING',
    emoji: <Image source={Images.crushing} style={{height: 43, width: 43, tintColor: 'white'}} />,

  },
  {
    id: 8,
    feeling: 'LONELY',
    emoji: <Lonely/>,
  },
  {
    id: 9,
    feeling: 'HOPEFUL',
    emoji: <Image source={Images.hopeful} style={{height: 43, width: 43, tintColor: 'white'}} />,

  },
  {
    id: 10,
    feeling: 'SCARED',
    emoji: <Image source={Images.scared} style={{height: 43, width: 43, tintColor: 'white'}} />,
  },

]



export default function MoodScreen() {
    const [currUser, fetch] = useState({});

    // let [fontsLoaded] = useFonts({
    //   Rubik_300Light,
    //   Rubik_300Light_Italic,
    //   Rubik_400Regular,
    //   Rubik_400Regular_Italic,
    //   Rubik_500Medium,
    //   Rubik_500Medium_Italic,
    //   Rubik_700Bold,
    //   Rubik_700Bold_Italic,
    //   Rubik_900Black,
    //   Rubik_900Black_Italic
    // });
    //
    // // Check if fonts have loaded
    // if (!fontsLoaded) {
    //   return <AppLoading />;
    // }

    const navigation = useNavigation();

    const getUserInfo = async (user) => {
      const docRef = doc(db, 'users', user.uid)
      let docSnap = await getDoc(docRef)
      if(docSnap.exists) {
        console.log(docSnap.data());
        fetch(docSnap.data());
      }
    }


    useEffect(() => {
      const auth = getAuth();
      const user = auth.currentUser
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        getUserInfo(user);

      } else {
        // No user is signed in
      }
    }, [])

    const renderItem = ({item}) => {
      return (

            <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate('SongScreen', {feeling: item.feeling})}>
                <View style={{flex: .35, height: '100%', justifyContent: 'center', alignItems: 'flex-end'}}>
                    {item.emoji}
                </View>
                <Text style={{flex: .65, textAlign: 'center', fontSize: 18, fontFamily: 'Rubik_400Regular', color: 'white'}}>
                  {item.feeling}
                </Text>

            </TouchableOpacity>

      );
    }

  return (
    <View style={styles.container}>

        <ImageBackground resizeMode="cover" style={styles.topImage} source={require('../../assets/Images/mountain-background.jpg')} >
            <Text style={{fontSize: 38, color: 'white', fontFamily: 'RubikLight', shadowColor: 'black', shadowOffset: {width: 2, height: 2}, shadowOpacity: 2,}}>
                Good day, {currUser.first_name}!
            </Text>

        </ImageBackground>

        <View style={{flex: .2, justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={styles.question}>
                How are we feeling today?
            </Text>
        </View>

        <View style={styles.bottomHalf} >
            <FlatList
              numColumns={2}
              data={emotions}
              renderItem={renderItem}
            />
        </View>

    </View>
  )
}

// <Text style={{fontSize: 38, color: 'white', fontFamily: 'Rubik_400Regular', marginTop: 15}}> GOOD DAY </Text>
// <Text style={{fontSize: 38, color: 'white', fontFamily: 'Rubik_700Bold'}}> Sophia </Text>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
      flex: .3,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
  },
  question: {
      color: '#7044A9',
      fontFamily: 'Rubik_500Medium',
      fontWeight: 'bold',
      fontSize: 36,
      textAlign: 'center',
      marginBottom: 20,
  },
  bottomHalf: {
    flex: .5,
    width: '100%',
  },
  buttons: {
    height: 75,
    backgroundColor: '#3B8EA5',
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

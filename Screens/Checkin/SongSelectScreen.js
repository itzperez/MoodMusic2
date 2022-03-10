import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getAccessToken, getSuggestedSongs } from '../../utils/apiCalls';
import AppLoading from 'expo-app-loading';
import Colors from "../../Themes/colors";
import axios from "axios";
import qs from "qs";
import Images from '../../assets/Images';
import Happy from '../../assets/Images/Feelings/happy.svg';
import Excited from '../../assets/Images/Feelings/excited.svg';
import Lonely from '../../assets/Images/Feelings/lonely.svg';
import Sad from '../../assets/Images/Feelings/sad.svg';
import Angry from '../../assets/Images/Feelings/angry.svg';
import Anxious from '../../assets/Images/Feelings/anxious.svg';
import Down from '../../assets/Images/Icons/down-svgrepo-com.svg';
import base64 from 'react-native-base64'
import { CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
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
import { db } from "../../firebase";

const Stack = createStackNavigator();

export default function SongScreen({route}) {
  // Load fonts
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

  // Spotify access token
  const [token, setToken] = useState('');

  const [text, setText] = useState('');
  const [suggestedSongs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(async () => {
    // Get Spotify access token
    const BASE64_ENCODED_AUTH_CODE = base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${BASE64_ENCODED_AUTH_CODE}`
      }
    };
    const data = {
      grant_type: 'client_credentials',
    };

    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        qs.stringify(data),
        headers
      );

      // Get initial suggested songs
      const spaceSubbedQuery = (route.params.feeling).replace(" ", "%20");
      console.log(`https://api.spotify.com/v1/search?q=${spaceSubbedQuery}&type=track&limit=4`);
      axios(`https://api.spotify.com/v1/search?q=${spaceSubbedQuery}&type=track&limit=4`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.access_token,
        },
      })
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      });

      // Update token
      setToken(response.data.access_token);
      //return response.data.access_token;

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isLoading && (token !== '')) {
      const spaceSubbedQuery = (route.params.feeling).replace(" ", "%20");
      console.log("TOKEN 2 ");
      console.log(token);
      console.log(`https://api.spotify.com/v1/search?q=${spaceSubbedQuery}&type=track&limit=4`);
      axios(`https://api.spotify.com/v1/search?q=${spaceSubbedQuery}&type=track&limit=4`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setSongs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
    }
  }, [token]);


  // Check if fonts have loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }


  console.log('route ->', route.params);
  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Song screen!</Text>
  //     <Text>Emotion: {route.params.feeling}</Text>
  //   </View>
  // );

  const search = () => {
    // firebase stuff that uploads the text or whatever your review is
    console.log("TEST: " + text);

    //getSuggestedSongs(setSongs, text, token);
    setText("");
    console.log("TOKEN!!!");
    console.log(token);
    console.log("SUGGESTED SONGS!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log(suggestedSongs["tracks"]["items"][0]["album"]["images"][0]["url"]);
    //console.log("SUGGESTED SONGS: " + suggestedSongs)
  }

  // if (isLoading) {
  //   return (
  //     <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
  //       <Text >Loading...</Text>
  //     </View>
  //   );
  // } else {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.downButton} onPress={() => navigation.navigate('SongScreen', {feeling: route.params.feeling, suggestedSongs: route.params.suggestedSongs})}>
          <Down fill="#FFFFFF" />
        </TouchableOpacity>
        <ImageBackground source={{ uri: `${route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["album"]["images"][0]["url"]}`}}
          style={styles.songItem}
          imageStyle={ styles.songItemImage }>

          <View style={styles.songItemContent}>
            <Text style={styles.songTitle}>{route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["name"]}</Text>
            <Text style={styles.songArtist}>{route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["album"]["artists"][0]["name"]}</Text>
          </View>
        </ImageBackground>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('ShareSongScreen', {feeling: route.params.feeling, suggestedSongs: route.params.suggestedSongs, gridNum: route.params.gridNum})}>
            <Text style={styles.shareText}>SHARE SONG</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.transparentblack,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  downButton: {
    flex: 1,
    justifyContent: 'center'
  },
  songItem: {
    flex: 5,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    margin: '20%',
  },
  songItemImage: {
    aspectRatio: 1,
    borderRadius: 20,
  },
  songItemContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.60)',
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
  },
  songTitle: {
    fontFamily: 'Rubik_400Regular',
    fontSize: 35,
    color: Colors.white,
    textAlign: 'center',
    alignItems: 'flex-end',
    marginBottom: 20
  },
  songArtist: {
    fontFamily: 'Rubik_300Light',
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  shareText: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 30,
    color: Colors.white,
  },
  buttonContainer: {
    flex: 2
  },
  shareButton: {
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 10
  },
});

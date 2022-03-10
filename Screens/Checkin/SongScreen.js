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
import base64 from 'react-native-base64'
import { CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
import Images from '../../assets/Images';
import Happy from '../../assets/Images/Feelings/happy.svg';
import Excited from '../../assets/Images/Feelings/excited.svg';
import Lonely from '../../assets/Images/Feelings/lonely.svg';
import Sad from '../../assets/Images/Feelings/sad.svg';
import Angry from '../../assets/Images/Feelings/angry.svg';
import Anxious from '../../assets/Images/Feelings/anxious.svg';
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
import colors from '../../Themes/colors';

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



  if (isLoading) {
    return (
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text >Loading...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.selectSongContainer}>
        <ImageBackground source={require('../../assets/Images/mountain-background.jpg')}
          style={styles.selectSongHeaderImage}
          imageStyle={{ borderRadius: 15 }}>
          <View style={styles.selectSongHeaderText}>
            <TouchableOpacity onPress={() => navigation.navigate('MoodScreen')}>
              <Back width={30} height={30} fill={'#FFFFFF'}/>
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Rubik_700Bold', fontSize: 30, color: Colors.white}}>Sophia</Text>
            <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 20, color: Colors.white}}>IS FEELING {route.params.feeling}</Text>
          </View>
          <View style={styles.selectSongHeaderEmoji}>
            {
              route.params.feeling === "HAPPY" ? <Happy/> : null
            }
            {
              route.params.feeling === "SAD" ? <Sad/> : null
            }
            {
              route.params.feeling === "CREATIVE" ? <Image source={Images.creative} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "ANXIOUS" ? <Anxious/> : null
            }
            {
              route.params.feeling === "EXCITED" ? <Excited/> : null
            }
            {
              route.params.feeling === "ANGRY" ? <Angry/> : null
            }
            {
              route.params.feeling === "CRUSHING" ? <Image source={Images.crushing} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "LONELY" ? <Lonely/> : null
            }
            {
              route.params.feeling === "HOPEFUL" ? <Image source={Images.hopeful} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "SCARED" ? <Image source={Images.scared} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "CREATIVE" ? <Image source={Images.creative} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "CRUSHING" ? <Image source={Images.crushing} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "HOPEFUL" ? <Image source={Images.hopeful} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }
            {
              route.params.feeling === "SCARED" ? <Image source={Images.scared} style={{height: 43, width: 43, tintColor: 'white'}} /> : null
            }

          </View>
        </ImageBackground>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Search for songs..."
          />
          <Button title="Search" onPress={search} style={{flex: 1}}/>
        </View>
        <View style={styles.suggestedSongsContainer}>
          <Text style={styles.h1}>Suggested Songs</Text>
          <View style={styles.suggestedSongsGridContainer}>
            <Pressable onPress={() => navigation.navigate('SongSelectScreen', {feeling: route.params.feeling,
                suggestedSongs: suggestedSongs, gridNum: 0})}>
              <ImageBackground source={{ uri: `${suggestedSongs["tracks"]["items"][0]["album"]["images"][0]["url"]}`}}
                style={styles.songItem}
                imageStyle={ styles.songItemImage }>

                    <View style={styles.songItemContent}>
                      <Text style={styles.songTitle}>{suggestedSongs["tracks"]["items"][0]["name"]}</Text>
                      <Text style={styles.songArtist}>{suggestedSongs["tracks"]["items"][0]["album"]["artists"][0]["name"]}</Text>
                    </View>

              </ImageBackground>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SongSelectScreen', {feeling: route.params.feeling,
                suggestedSongs: suggestedSongs, gridNum: 1})}>
              <ImageBackground source={{ uri: `${suggestedSongs["tracks"]["items"][1]["album"]["images"][0]["url"]}`}}
                style={styles.songItem}
                imageStyle={ styles.songItemImage }>
                  <View style={styles.songItemContent}>
                    <Text style={styles.songTitle}>{suggestedSongs["tracks"]["items"][1]["name"]}</Text>
                    <Text style={styles.songArtist}>{suggestedSongs["tracks"]["items"][1]["album"]["artists"][0]["name"]}</Text>
                  </View>
              </ImageBackground>
            </Pressable>
          </View>
          <View style={styles.suggestedSongsGridContainer}>
            <Pressable onPress={() => navigation.navigate('SongSelectScreen', {feeling: route.params.feeling,
                suggestedSongs: suggestedSongs, gridNum: 2})}>
              <ImageBackground source={{ uri: `${suggestedSongs["tracks"]["items"][2]["album"]["images"][0]["url"]}`}}
                style={styles.songItem}
                imageStyle={ styles.songItemImage }>
                  <View style={styles.songItemContent}>
                    <Text style={styles.songTitle}>{suggestedSongs["tracks"]["items"][2]["name"]}</Text>
                    <Text style={styles.songArtist}>{suggestedSongs["tracks"]["items"][2]["album"]["artists"][0]["name"]}</Text>
                  </View>
              </ImageBackground>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SongSelectScreen', {feeling: route.params.feeling,
                suggestedSongs: suggestedSongs, gridNum: 3})}>
              <ImageBackground source={{ uri: `${suggestedSongs["tracks"]["items"][3]["album"]["images"][0]["url"]}`}}
                style={styles.songItem}
                imageStyle={ styles.songItemImage }>
                  <View style={styles.songItemContent}>
                    <Text style={styles.songTitle}>{suggestedSongs["tracks"]["items"][3]["name"]}</Text>
                    <Text style={styles.songArtist}>{suggestedSongs["tracks"]["items"][3]["album"]["artists"][0]["name"]}</Text>
                  </View>
              </ImageBackground>
            </Pressable>
          </View>
        </View>
        <View style={styles.currentSongBar}>

        </View>
      </SafeAreaView>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontFamily: 'Rubik_500Medium',
    fontSize: 30,
    color: Colors.purple,
    flex: 0.2
  },
  selectSongContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  selectSongHeaderImage: {
    width: '100%',
    height: '100%',
    flex: 1.7,
    marginTop: -50,
    flexDirection: 'row'
  },
  selectSongHeaderText: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: '7%',
    marginTop: '4%',
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 2,
  },
  selectSongHeaderEmoji: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '100%',
    paddingRight: '7%',
    marginTop: '4%',
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 2,
  },
  searchContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    marginTop: 5,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 50,
    margin: 5,
    borderWidth: 3,
    borderColor: Colors.blue,
    padding: 8,
    borderRadius: 20,
    flex: 5
  },
  suggestedSongsContainer: {
    flex: 4,
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  suggestedSongsGridContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  songItem: {
    flex: 1,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    margin: '5%',
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
    fontSize: 18,
    color: Colors.white,
    textAlign: 'center',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  songArtist: {
    fontFamily: 'Rubik_300Light',
    fontSize: 12,
    color: Colors.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  currentSongBar: {
    flex: 0.6
  }
});

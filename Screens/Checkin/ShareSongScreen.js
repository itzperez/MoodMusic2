import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Keyboard, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import Back from '../../assets/Images/Icons/back-svgrepo-com.svg'
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
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function SongScreen({ route }) {
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

    const [text, setText] = useState('');
    const [suggestedSongs, setSongs] = useState([]);
    const navigation = useNavigation();

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
        // console.log("TOKEN!!!");
        // console.log(token);
        // console.log("SUGGESTED SONGS!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        // console.log(suggestedSongs["tracks"]["items"][0]["album"]["images"][0]["url"]);
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

            <KeyboardAvoidingView behavior="position" style={styles.keyboardContainer}>
                <ImageBackground source={require('../../assets/Images/mountain-background.jpg')}
                    style={styles.selectSongHeaderImage}
                    imageStyle={{ borderRadius: 15 }}>
                    <View style={styles.selectSongHeaderText}>
                        <TouchableOpacity onPress={() => navigation.navigate('SongSelectScreen', { feeling: route.params.feeling, suggestedSongs: route.params.suggestedSongs, gridNum: route.params.gridNum })}>
                            <Back width={30} height={30} fill={'#FFFFFF'} />
                        </TouchableOpacity>

                        <Text style={{ fontFamily: 'Rubik_700Bold', fontSize: 30, color: Colors.white }}>Sophia</Text>
                        <Text style={{ fontFamily: 'Rubik_400Regular', fontSize: 20, color: Colors.white }}>IS FEELING {route.params.feeling}</Text>
                    </View>
                    <View style={styles.selectSongHeaderEmoji}>
                        {
                            route.params.feeling === "HAPPY" ? <Happy /> : null
                        }
                        {
                            route.params.feeling === "SAD" ? <Sad /> : null
                        }
                        {
                            route.params.feeling === "CREATIVE" ? <Image source={Images.creative} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                        }
                        {
                            route.params.feeling === "ANXIOUS" ? <Anxious /> : null
                        }
                        {
                            route.params.feeling === "EXCITED" ? <Excited /> : null
                        }
                        {
                            route.params.feeling === "ANGRY" ? <Angry /> : null
                        }
                        {
                            route.params.feeling === "CRUSHING" ? <Image source={Images.crushing} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                        }
                        {
                            route.params.feeling === "LONELY" ? <Lonely /> : null
                        }
                        {
                            route.params.feeling === "HOPEFUL" ? <Image source={Images.hopeful} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                        }
                        {
                            route.params.feeling === "SCARED" ? <Image source={Images.scared} style={{ height: 43, width: 43, tintColor: 'white' }} /> : null
                        }
                    </View>
                </ImageBackground>

                <View style={styles.shareContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextMain}>Share</Text>
                        <Text style={styles.headingTextSub}>WITH FRIENDS</Text>
                    </View>
                    <View style={styles.albumCoverContainer}>
                        <ImageBackground source={{ uri: `${route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["album"]["images"][0]["url"]}` }}
                            style={styles.songItem}
                            imageStyle={styles.songItemImage}>

                            <View style={styles.songItemContent}>
                                <Text style={styles.songTitle}>{route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["name"]}</Text>
                                <Text style={styles.songArtist}>{route.params.suggestedSongs["tracks"]["items"][route.params.gridNum]["album"]["artists"][0]["name"]}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.captionContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setText}
                            value={text}
                            placeholder="Caption (optional)"
                        />
                        {/* <TouchableOpacity onPress={search} style={styles.shareButton}> */}
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('HomeScreen');
                            setText("");
                            Keyboard.dismiss;
                            }} style={styles.shareButton}>
                            <Text style={styles.shareText}>SHARE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>





            {/* <TouchableOpacity style={styles.downButton} onPress={() => navigation.navigate('SongScreen', {feeling: route.params.feeling, suggestedSongs: route.params.suggestedSongs})}>
          <Down fill="#FFFFFF" />
        </TouchableOpacity>
        <ImageBackground source={{ uri: `${route.params.suggestedSongs["tracks"]["items"][0]["album"]["images"][0]["url"]}`}}
          style={styles.songItem}
          imageStyle={ styles.songItemImage }>

          <View style={styles.songItemContent}>
            <Text style={styles.songTitle}>{route.params.suggestedSongs["tracks"]["items"][0]["name"]}</Text>
            <Text style={styles.songArtist}>{route.params.suggestedSongs["tracks"]["items"][0]["album"]["artists"][0]["name"]}</Text>
          </View>
        </ImageBackground>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('SongScreen', {feeling: route.params.feeling, suggestedSongs: route.params.suggestedSongs})}>
            <Text style={styles.shareText}>SHARE SONG</Text>
          </TouchableOpacity>
        </View> */}
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareContainer: {
        flex: 4.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingContainer: {
        flex: 1,
    },
    albumCoverContainer: {
        flex: 5,
        marginTop: 20
    },
    captionContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 40
    },
    input: {
        borderWidth: 3,
        borderColor: Colors.blue,
        padding: 8,
        borderRadius: 10,
        flex: 2,
        width: '80%',
        marginTop: 10,
    },
    shareButtonContainer: {
        flex: 1,
    },
    headingTextMain: {
        fontFamily: 'Rubik_500Medium',
        fontSize: 30,
        color: Colors.purple,
        textAlign: 'center',
        marginTop: 10
    },
    headingTextSub: {
        fontFamily: 'Rubik_400Regular',
        fontSize: 15,
        color: Colors.purple,
        textAlign: 'center'
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
        shadowOffset: { width: 2, height: 2 },
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
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 2,
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
        fontSize: 30,
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
        fontSize: 25,
        color: Colors.white,
        textAlign: 'center'
    },
    shareButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 10,
        width: '80%',
        marginTop: 10
    },
});
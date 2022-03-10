import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Image, ImageBackground, TouchableOpacity, Button} from 'react-native';
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
import Heart from '../../assets/Images/heart.svg';
import Community from '../../assets/Images/community.svg';
import { useNavigation } from '@react-navigation/native';


const gratitudeSongs = [
    {
    rank: 1,
    songName: 'Gratitude',
    artistName: 'Brandon Lake',
    imageUrl: "https://i.scdn.co/image/ab67616d000048518794282921c5e78dc245ff90",
    numberVotes: 55,
    },
    {
    rank: 2,
    songName: 'Grateful',
    artistName: 'dhruv',
    imageUrl: "https://i.scdn.co/image/ab67616d000048516f04e53cb5309f8e88286842",
    numberVotes: 27,
    },
]

const kindnessSongs = [
    {
    rank: 1,
    songName: 'Treat People With Kindness',
    artistName: 'Harry Styles',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485177fdcfda6535601aff081b6a",
    numberVotes: 28,
    },
    {
    rank: 2,
    songName: 'Kindness',
    artistName: 'MO',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851432ad46607948c43b98034e4",
    numberVotes: 14,
    },
]

const lossSongs = [
    {
    rank: 1,
    songName: 'Gone Too Soon',
    artistName: 'Daughtry',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851c52162f54aa26ff5bc52560a",
    numberVotes: 30,
    },
    {
    rank: 2,
    songName: 'I Will Not Say Goodbye',
    artistName: 'Danny Gokey',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485119ce87ff89f9b56a1ea6ff84",
    numberVotes: 23,
    },
    {
    rank: 3,
    songName: 'Broken',
    artistName: 'Lifehouse',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851b67e8ac9a5b999b2907b2f64",
    numberVotes: 7,
    },
]

const happySongs = [
    {
    rank: 1,
    songName: 'Happy',
    artistName: 'Pharrel Williams',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851e8107e6d9214baa81bb79bba",
    numberVotes: 50,
    },
    {
    rank: 2,
    songName: 'Happy Together',
    artistName: 'The Turtles',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485172649ad8e79d1e8bdd54c929",
    numberVotes: 47,
    },
    {
    rank: 3,
    songName: 'Tongue Tied',
    artistName: 'Grouplove',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851d84a9bbcba91cb6a4a212b1b",
    numberVotes: 24,
    },
]

const relationshipSongs = [
    {
    rank: 1,
    songName: 'Summer Of Love',
    artistName: 'Shawn Mendes',
    imageUrl: "https://i.scdn.co/image/ab67616d00004851a111c87c210cc9bff93948bd",
    numberVotes: 53,
    },
    {
    rank: 2,
    songName: 'Speechless',
    artistName: 'Dan + Jay',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485105e4408393e1c81a8ab1bf26",
    numberVotes: 47,
    },
    {
    rank: 3,
    songName: 'Beautifu',
    artistName: 'Bazzi ft. Camila Cabello',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485105559264ebef3889709826cf",
    numberVotes: 24,
    },

]

const lonelySongs = [
    {
    rank: 1,
    songName: 'Mr Lonely',
    artistName: 'Bobby Vinton',
    imageUrl: "https://i.scdn.co/image/ab67616d000048515980cda6de8365d077f34a5e",
    numberVotes: 47,
    },
    {
    rank: 2,
    songName: 'Why',
    artistName: 'Shawn Mendes',
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273269423eb6467e308c0fbce24",
    numberVotes: 38,
    },



]

const familySongs = [
    {
    rank: 1,
    songName: 'Family Ties',
    artistName: 'Kendrick Lamar ft. Baby Keem',
    imageUrl: "https://i.scdn.co/image/ab67616d000048511bfa23b13d0504fb90c37b39",
    numberVotes: 47,
    },

]


const friendshipSongs = [
    {
    rank: 1,
    songName: 'Friends Like Me',
    artistName: 'Will Smith',
    imageUrl: 'https://i.scdn.co/image/ab67616d000048519986d69836eac008a927b032',
    numberVotes: 19,
    },
]


const heartbreakSongs = [
    {
    rank: 1,
    songName: 'Hearbreak Anniversary',
    artistName: 'Giveon',
    imageUrl: "https://i.scdn.co/image/ab67616d0000485118ff322fcdd47c9400872da6",
    numberVotes: 16,
    },
]

const findCommunities = [
  {
    id: 1,
    name: 'Gratitude',
    description: 'A community for anyone who wants to feel gratitude or share the gratitude they are experiencing.',
    color: '#3b8ea5',
    numberOfMembers: 37,
    songs: gratitudeSongs,
  },
  {
  id: 2,
  name: 'Kindness',
  description: 'A community for people who value kindness and want to share kindness.',
  color: '#DEC20B',
  numberOfMembers: 98,
  songs: kindnessSongs,
  },
  {
  id: 3,
  name: 'Loneliness',
  description: 'A community for people struggling with loneliness or are feeling lonely.',
  color: '#993300',
  numberOfMembers: 64,
  songs: lonelySongs,
  },
  {
  id: 4,
  name: 'Family',
  description: 'A community to share anything related to families.',
  color: '#29a329',
  numberOfMembers: 55,
  songs: familySongs,
  },
  {
  id: 5,
  name: 'Friendship',
  description: 'A community to share anything related to friendships.',
  color: '#0066cc',
  numberOfMembers: 84,
  songs: friendshipSongs,
  },
  {
  id: 6,
  name: 'Heartbeak',
  description: 'A community for people struggling with hearbreak or are feeling heartbroken.',
  color: '#7044a9',
  numberOfMembers: 18,
  songs: heartbreakSongs,
  },
]

const myCommunities = [
  {
    id: 1,
    name: 'Happiness',
    description: 'A community for anyone who wants to feel happier or share the happiness they are experiencing.',
    color: '#cc7a00',
    numberOfMembers: 87,
    songs: happySongs,
  },
  {
    id: 2,
    name: 'Relationships',
    description: 'A community to share anything related to romantic relationships.',
    color: '#a94487',
    numberOfMembers: 112,
    songs: relationshipSongs,
  },
  {
    id: 3,
    name: 'Dealing with loss',
    description: 'A community for those who have experienced a loss',
    color: '#7300e6',
    numberOfMembers: 48,
    songs: lossSongs,
  },
]

export default function CommunitiesScreen() {

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
      Rubik_900Black_Italic,
    });

    // Check if fonts have loaded
    if (!fontsLoaded) {
      return <AppLoading />;
    }

    const navigation = useNavigation();

    const nextScreen = (item) => {
        console.log('item --->', item);
        if (myCommunities.some(elem => elem.name === item.name)) {
            navigation.navigate('CommunityScreen', {community: item});
        } else{
            navigation.navigate('JoinCommunityScreen', {community: item});
        }
    }


    const renderCommunities = ({item}) => {
      return (

            <TouchableOpacity style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 130,
              height: 130,
              backgroundColor: item.color,
              borderRadius: 15,
              marginBottom: 15,
              marginHorizontal: 20,
              marginTop: 5,
          }} onPress={() => nextScreen(item)}>

                <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
                  {item.name}
                </Text>

            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={{flex: .02}}/>
            <View style={{flex: .33, width: '100%'}}>

                <View style={{flex: .2, flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                    <Heart style={{marginLeft: 20}}height={25} width={25} fill={'black'} />
                    <Text style={{marginLeft: 10, fontSize: 22}}> MY COMMUNITIES </Text>

                </View>

                <View style={{flex: .8, width: '100%'}}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={myCommunities}
                      renderItem={renderCommunities}
                    />
                </View>

            </View>

            <View style={{flex: .1, flexDirection: 'row', alignItems: 'center', width: '100%'}}>
                <Community style={{marginLeft: 20}}height={30} width={30} fill={'black'} />
                <Text style={{marginLeft: 10, fontSize: 22}}> FIND COMMUNITIES </Text>

            </View>

            <View style={{flex: .55, width: '100%'}}>
                  <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={true}
                    data={findCommunities}
                    renderItem={renderCommunities}
                  />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  findCommunities: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    borderRadius: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    marginTop: 5,
  },
});

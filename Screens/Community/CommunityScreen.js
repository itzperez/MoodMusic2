import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import Friends from '../../assets/Images/friends.svg';
import Back from '../../assets/Images/Icons/back-svgrepo-com.svg'
import Song from '../../Song.js';
import { useNavigation } from '@react-navigation/native';


                // <View style={{flex: .03, backgroundColor: 'red', height: '100%'}}/>
export default function CommunityScreen({route}) {

    const navigation = useNavigation();

    const renderSong = (song) => {
        let track = song.item;

        return (
            <Song
                rank={track.rank}
                songName={track.songName}
                artistName={track.artistName}
                imageUrl={track.imageUrl}
                numberVotes={track.numberVotes}
            />
        )
    }



  return (
    <View style={styles.container}>
        <View style={{flex: .02, width: '100%'}}/>

        <View style={{flex: .13, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('CommunitiesScreen')}>
                    <Back style={{marginLeft: 5}} width={25} height={25} fill={'black'}/>
                </TouchableOpacity>
                <Text style={{fontSize: 36, marginLeft: 10}}> {route.params.community.name} </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Friends style={{marginRight: 5}} height={30} width={30} fill={'black'} />
                <Text style={{marginRight: 20, fontSize: 16}}> {route.params.community.numberOfMembers} </Text>
            </View>
        </View>

        <View style={{flex: .1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 26}}> Community playlist </Text>

        </View>


        <View style={{flex: .6, width: '100%'}}>
            <FlatList
              data={route.params.community.songs}
              renderItem={renderSong}
            />

        </View>

        <View style={{flex: .15, width: '100%'}}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  b: {
      flex: .2,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
  },
  c: {
      flex: .6,
      justifyContent: 'center',
      backgroundColor: 'red',
      height: '100%',
      width: '100%',
  },
  d: {
      flex: .2,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'yellow',
      height: '100%',
      width: '100%',
  },
});

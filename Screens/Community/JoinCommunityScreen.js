import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Friends from '../../assets/Images/friends.svg';
import { useNavigation } from '@react-navigation/native';


export default function JoinCommunityScreen({route}) {
    const navigation = useNavigation();

    const joinCommunity = (community) => {
        community['numberOfMembers'] = community.numberOfMembers + 1;
        console.log('community -->>>', community);
        navigation.navigate('CommunityScreen', {community: community});

    }

      return (
        <View style={styles.container}>
          <View style={{flex: .05}}/>

          <View style={{flex: .4, width: '100%'}}>
              <View style={{flex: .3, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontSize: 36, marginLeft: 20}}> {route.params.community.name} </Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Friends style={{marginRight: 5}} height={30} width={30} fill={'black'} />
                        <Text style={{marginRight: 20, fontSize: 16}}> {route.params.community.numberOfMembers} </Text>

                    </View>

              </View>

              <View style={{flex: .7, width: '92%'}}>
                    <Text style={{marginLeft: 25, marginTop: 15, fontSize: 22}}> {route.params.community.description} </Text>
              </View>

          </View>

          <TouchableOpacity onPress={() => joinCommunity(route.params.community)} style={{flex: .1, backgroundColor: '#3B8EA5', width: '35%', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}>
              <Text style={{fontSize: 26, color: 'white'}}>
                  Join
              </Text>
          </TouchableOpacity>

          <View style={{flex: .1}} />

          <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: .1, width: '35%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10}}>
              <Text style={{fontSize: 20, color: '#e9497e'}}>
                  Go back
              </Text>
          </TouchableOpacity>

          <View style={{flex: .25}}/>
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
});

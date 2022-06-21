import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { View,Image, Text } from 'react-native';
import { Surface,List } from 'react-native-paper';
import { useLogin } from '../../context/LoginProvider';
import { styles } from '../../stylesheet/style';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from './ChangePass';
import UserGuid from './UserGuid';

function Menu({ navigation }) {

  const {setLoggedIn,userProfile} = useLogin();

  const clearAll = async () => {
    try {
      await AsyncStorage.clear().then(() => {
        setLoggedIn(false);
      })
    } catch (e) {

    }

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Surface style={styles.tab_surface}>



        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Surface style={styles.pro_surface}>
            <Text style={styles.pro_name}>{userProfile.name}</Text>
            <Text style={styles.pro_email}>{userProfile.email}</Text>
          </Surface>
        </View>


        
          <List.Item
          title="Change Password"
          titleStyle = {styles.list_titel}
          left={props => <List.Icon {...props} icon="account-key" color="#ffc23a"   />}
          onPress={() => navigation.navigate("ChangePassword")} />
          <List.Item
          title="User Guide"
          titleStyle = {styles.list_titel}
          left={props => <List.Icon {...props} icon="book" color="#ffc23a"  />}
          onPress={() => navigation.navigate("UserGuid")}/>
         <List.Item
          title="Sign Out"
          titleStyle = {styles.list_titel_signout}
          left={props => <List.Icon {...props} icon="logout" color="#eb345e"  />}
          onPress={() => clearAll()}/>
      </Surface>

    </View>
  );
}


const stack = createNativeStackNavigator();

export default function Setting({ navigation, route }) {
  return (
    < stack.Navigator initialRouteName="Menus" screenOptions={{ headerShown: true }}>
      < stack.Screen name="Menus" component={Menu} options={() => ({
        headerTitle: "Stock portal",
        headerStyle: { backgroundColor: '#ffc23a' },
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
      })} />
     
       < stack.Screen name="ChangePassword" component={ChangePassword} options={{
        title: "Change Password",
        headerStyle: { backgroundColor: '#ffc23a', },
        headerTintColor: 'white',
        headerBackTitle: "back",
        headerBackTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
      }} />
       < stack.Screen name="UserGuid" component={UserGuid} options={{
        title: "User Guid",
        headerStyle: { backgroundColor: '#ffc23a', },
        headerTintColor: 'white',
        headerBackTitle: "back",
        headerBackTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
      }} />
      
    </ stack.Navigator>
  );
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, StatusBar, Image, Text } from 'react-native';
import { Surface, Button, Divider, List } from 'react-native-paper';
import { useLogin } from '../../context/LoginProvider';
import { styles } from '../../stylesheet/style';
import img from '../../assets/login_bac.jpg';
import himg from '../../assets/sbanner.png';
import Profile from './Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import ChangePassword from './ChangePass';
import UserGuid from './UserGuid';
function Menu({ navigation }) {
  const { userData, setLoggedIn, userProfile } = useLogin();
  //console.log(userData, "setting")

  const handlesignout = () => {
    setLoggedIn(false);
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear().then(() => {
        setLoggedIn(false);
      })
    } catch (e) {

    }

    console.log('Done.')
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Surface style={styles.tab_surface}>



        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Surface style={styles.pro_surface}>
            <Image source={himg} style={styles.pro_img} />
            <Text style={styles.pro_name}>IFN666-Stock Portal</Text>
            {/* <Text style={styles.pro_email}>{userProfile.email}</Text> */}
          </Surface>
        </View>

        <List.Item
          title="Profile"
          titleStyle = {styles.list_titel}
          left={props => <List.Icon {...props}  icon="account-tie" color="black" />}
          right={props => <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />}
          onPress={() => navigation.navigate("Profile")}
        />
        
          <List.Item
          title="Chenge Password"
          titleStyle = {styles.list_titel}
          left={props => <List.Icon {...props} icon="account-key" color="black"   />}
          right={props => <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />}
          onPress={() => navigation.navigate("ChangePassword")}

        />
          <List.Item
          title="User Guid"
          titleStyle = {styles.list_titel}
          left={props => <List.Icon {...props} icon="book" color="black"  />}
          right={props => <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />}
          onPress={() => navigation.navigate("UserGuid")}

        />
         <List.Item
          title="Sign Out"
          titleStyle = {styles.list_titel_signout}
          left={props => <List.Icon {...props} icon="logout" color="black"  />}
          onPress={() => clearAll()}
        />
     

      </Surface>

    </View>
  );
}


const stack = createNativeStackNavigator();

export default function Setting({ navigation, route }) {
  return (
    < stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: true }}>
      < stack.Screen name="Menu" component={Menu} options={() => ({
        headerTitle: "Stock portal",
        headerStyle: { backgroundColor: '#ffc23a' },
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
      })} />
      < stack.Screen name="Profile" component={Profile} options={{
        title: "Profile",
        headerStyle: { backgroundColor: '#ffc23a', },
        headerTintColor: 'white',
        headerBackTitle: "back",
        headerBackTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
      }} />
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

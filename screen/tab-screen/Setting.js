import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, StatusBar, Image, Text } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import { useLogin } from '../../context/LoginProvider';
import { styles } from '../../stylesheet/style';
import img from '../../assets/login_bac.jpg';
import himg from '../../assets/sbanner.png';

export default function Setting({ navigation }) {
  const { userData, setLoggedIn } = useLogin();
  console.log(userData, "setting")

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Surface style={styles.tab_surface}>

        <ScrollView style={styles.scrollView}>
          <View style={styles.home_container}>
            {/* <Text style={styles.text}>IFN666 Stocks</Text>
            <Text>Setting</Text>
            <Text style={styles.errormsg}>{userData.user.name}</Text>
            <Text style={styles.errormsg}>{userData.user.id}</Text>
            <Text style={styles.errormsg}>{userData.user.email}</Text> */}
<Image style={styles.stretch} source={himg} />
          </View>
          <View style={styles.menu_item}>
            <Text style={styles.menu_head}>Account</Text>
          </View>
          <Divider style={styles.divider2} />
          <View style={styles.menu_item}>
            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Profile</Text></Button>
            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Change Passwoad</Text></Button>
          </View>
          <View style={styles.menu_item}>
            <Text style={styles.menu_head}>General</Text>
          </View>
          <Divider style={styles.divider2} />
          <View style={styles.menu_item}>
            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Documents</Text></Button>
            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>User guid</Text></Button>
            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Feature preview</Text></Button>
          </View>
          <View style={styles.menu_item}>
            <Text style={styles.menu_head}>Log Out From This Device</Text>
          </View>
          <Divider style={styles.divider2} />
          <View style={styles.menu_item}>
          <Button style={styles.sign_button} onPress={() => clearAll()}><Text style={styles.b_text}>Log out</Text></Button>
          </View>
          
        </ScrollView>
      </Surface>

    </View>
  );
}


// export default function Menu({ navigation }) {


//   return (

//     <View style={styles.container}>
//       <ImageBackground source={img} resizeMode="cover" style={styles.image}>
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

//         </View>

//       </ImageBackground>
//     </View>




//   );
// }
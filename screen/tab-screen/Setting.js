import * as React from 'react';
import { Text, Button, View } from 'react-native';
import { useLogin } from '../../context/LoginProvider';
import { styles } from '../../stylesheet/style';

export default function Setting({navigation}) {
  const {userData,setLoggedIn} = useLogin();

  const handlesignout = ()=>{
    setLoggedIn(false);
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting</Text>
        <Text style={styles.errormsg}>{userData.user.name}</Text>
        <Text style={styles.errormsg}>{userData.user.id}</Text>
        <Text style={styles.errormsg}>{userData.user.email}</Text>
        <Button title="Log Out" onPress={handlesignout} />
      </View>
    );
  }
  
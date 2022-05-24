import React from 'react';
import { ImageBackground, View, StyleSheet, StatusBar, Text, TextInput } from 'react-native';
import { Surface, Button, } from 'react-native-paper';
import { useState } from 'react';
import img from '../../assets/login_bac.jpg';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'



export default function SignUpForm({ navigation }) {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        name:'',
    });

    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('hellow world');
    const [cpass, onChangeCpass] = React.useState("");
    const { email, password, name } = userInfo;

    const handleOnChange = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
        //console.log(email, "email")
    };

    const handlesignup = async () => {
        console.log("clicked");
          try {
            const res = await Api.post('/signup', { ...userInfo },{
            headers:{'Content-Type': 'application/json'},
          });
            if (res.data.result) {
              setUserInfo({ email: '', password: '',name:'' });
              setErrormsg(res.data.message);
              //setProfile(res.data.user);
              //setIsLoggedIn(true);
            }
            console.log(res.data);
          } catch (error) {
            setErrormsg(error.response.data.message);
            console.log(error);
          }
        
      };

      

    return (
        <View style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Surface style={styles.surface}>
                        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
                        <Text style={styles.header}>Sign Up</Text>
                        <View style={styles.form_container}>
                            <TextInput keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={value => handleOnChange(value, 'email')} value={email} />
                            <TextInput keyboardType='email-address' placeholder='Full Name' style={styles.input} onChangeText={value => handleOnChange(value, 'name')} value={name} />
                            <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={value => handleOnChange(value, 'password')} value={password} />
                            <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.input} onChangeText={onChangeCpass} value={cpass} />
                            <View style={styles.button_container}>
                            <Button style={styles.sign_button} onPress={handlesignup}><Text style={styles.b_text}>Sign In →</Text></Button>
                        </View> 
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text >Already have an account?
                        <Button type="text"  onPress={() => navigation.navigate('Signin')}><Text style={styles.l_text}>Sign In</Text></Button>
                        </Text>
                        </View>                       
                    </Surface>
                    
                </View>
            </ImageBackground>
        </View>
    );
}

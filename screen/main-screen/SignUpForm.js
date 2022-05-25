import React from 'react';
import { ImageBackground, View, StatusBar,ScrollView, Image, Text, TextInput } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import himg from '../../assets/sbanner.png';
import { useState } from 'react';
import img from '../../assets/login_bac.jpg';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'
import { Ionicons } from '@expo/vector-icons';



export default function SignUpForm({ navigation }) {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        name: '',
    });

    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('hellow world');
    const [cpass, setCpass] = useState("");
    const { email, password, name } = userInfo;

    const handleOnChange = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
    };

    const emailValidator = (text) => {
        setError('')
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log(text, reg.test(text));
        if (!reg.test(text)) {
            setError("Enter valid email address")
        }
        return reg.test(text);
    };
    const nameValidator = (text) => {
        {
            setError('')
            if (text.length < 4) {
                setError("The name looks too short")
            } else {
                return true
            }

        }
    };
    const passValidator = (password, cPassword) => {
        setError('')
        if (password.length == 0) {
            setError("Password is required feild")
        } else if (password.length < 8 || password.length > 20) {
            setError("Password should be 8 to 20 characters")
        } else if (password !== cPassword) {
            setError("Passwoad and confirm password should be same.")
        } else {
            return true;
        }
        if (cPassword.length == 0) {
            setError("Confirm Password is required feild")
        } else if (cPassword.length < 8 || cPassword.length > 20) {
            setError("Password should be min 8 char and max 20 char")
        }
    };

    const handlesignup = async () => {
        if (nameValidator(name) && emailValidator(email) &&  passValidator(password, cpass)) {
            console.log("clicked");
            try {
                const res = await Api.post('/signup', { ...userInfo }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (res.data.result) {
                    setUserInfo({ email: '', password: '', name: '',cpass:'' });
                    setErrormsg(res.data.message);
                    navigation.navigate('Signin')
                }
                console.log(res.data);
            } catch (error) {
                setErrormsg(error.response.data.message);
                console.log(error);
            }
        }
    };

    return (
      
        <View style={styles.container}>
        <ImageBackground source={img} resizeMode="cover" style={styles.image}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Surface style={styles.home_surface}>
                    <View style={styles.navbar}>
                        <Image style={styles.sicon} source={himg} />
                        <Ionicons style={styles.iconbar} name="arrow-back-circle-outline" size={40} color="#ffc23a" onPress={() => navigation.goBack()} />
                    </View>
                    <Divider style={styles.divider} />
                    <ScrollView style={styles.scrollView}>

                        <Text style={styles.header}>Sign Up</Text>
                        <View style={styles.form_container}>
                            <TextInput keyboardType='email-address' placeholder='Full Name' style={styles.input} onChangeText={value => handleOnChange(value, 'name')} value={name} />
                            <TextInput keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={value => handleOnChange(value, 'email')} value={email} />
                            <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={value => handleOnChange(value, 'password')} value={password} />
                            <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.input} onChangeText={setCpass} value={cpass} />
                            <Text style={styles.errormsg}> {error && error}</Text>
                            <View style={styles.button_container}>
                                <Button style={styles.sign_button} onPress={handlesignup}><Text style={styles.b_text}>Sign UP →</Text></Button>
                            </View>
                        </View>
                        <View style={styles.info_container}>
                            <Text >Already have an account?</Text>
                            <Button type="text" onPress={() => navigation.navigate('Signin')}><Text style={styles.l_text}>Sign In</Text></Button>
                            
                        </View>
                        </ScrollView>
                        </Surface>
                </View>
            </ImageBackground>
        </View> 
    );
}

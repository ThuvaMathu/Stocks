import * as React from 'react';
import { ImageBackground, View, StatusBar, ScrollView, Image, Text, TextInput } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import img from '../../assets/login_bac.jpg';
import himg from '../../assets/sbanner.png';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'
import { useState } from 'react';
import { useLogin } from '../../context/LoginProvider';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://192.168.1.113:8000";

export default function SignInForm({ route, navigation }) {



    const { setLoggedIn, setUserData } = useLogin();

    const [text, onChangeText] = React.useState("");
    const [pass, onChangePass] = React.useState("");
    const [message, setMessage] = useState('hellow');
    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('');

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const { email, password, } = userInfo;

    const handleOnChange = (value, fieldName) => {

        setUserInfo({ ...userInfo, [fieldName]: value });
    };
    const validate = (text) => {
        setError('')
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log(text, reg.test(text));
        if (!reg.test(text)) {
            setError("Enter valid email address")
        }
        return reg.test(text);
    };
    const passValidator = (password) => {
        setError('')
        if (password.length == 0) {
            setError("Password is required feild")
        } else if (password.length < 8 || password.length > 20) {
            setError("Password should be 8 to 20 characters")
        } else {
            return true;1234567
        }
    };
   
    const handlesignin = async () => {
        if (validate(email) && passValidator(password)) {
            console.log("clicked");
            try {
                const res = await Api.post('/login', { ...userInfo }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (res.data.result) {
                    console.log(res);
                    await AsyncStorage.setItem('@MyApp_user', JSON.stringify(res.data))
                    setUserInfo({ email: '', password: '' });
                    setErrormsg(res.data.message);
                    onLoggedIn(res.data.token);
                    setUserData(res.data)
                    setLoggedIn(true)
                }
                console.log(res.data);
            } catch (error) {
                setErrormsg(error.response.data.message);
                console.log(error);
            }
        }
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(async res => {
                try {
                    const jsonRes = await res.json();
                    if (res.status === 200) {
                        setMessage(jsonRes.message);
                    }
                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log(err);
            });
    }

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

                            <Text style={styles.header}>Sign In</Text>
                            <View style={styles.form_container}>
                                <TextInput keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={value => handleOnChange(value, 'email')} value={email} />
                                <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={value => handleOnChange(value, 'password')} value={password} />
                                <Text style={styles.errormsg}> {error && error}</Text>
                                <Text style={styles.errormsg}> {errormsg && errormsg}</Text>
                            </View>
                            <View style={styles.button_container}>
                                <Button style={styles.sign_button} onPress={handlesignin}><Text style={styles.b_text}>Sign In →</Text></Button>
                            </View>
                            <View style={styles.info_container}>
                                <Text >Don't have an account?</Text>
                                <Button type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>sign up</Text></Button>
                            </View>
                        </ScrollView>
                    </Surface>
                </View>
            </ImageBackground>
        </View>

    );
}

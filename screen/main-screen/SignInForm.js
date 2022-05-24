import * as React from 'react';
import { ImageBackground, View, StatusBar, Text, TextInput } from 'react-native';
import { Surface, Button, } from 'react-native-paper';
import img from '../../assets/login_bac.jpg';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'
import { useState } from 'react';
import { useLogin } from '../../context/LoginProvider';

const API_URL = "http://192.168.1.113:8000";

export default function SignInForm({ navigation }) {

    const { setLoggedIn, setUserData } = useLogin();

    const [text, onChangeText] = React.useState("");
    const [pass, onChangePass] = React.useState("");
    const [message, setMessage] = useState('hellow');
    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('hellow world');

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const { email, password, } = userInfo;

    const handleOnChange = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
        //console.log(email, "email")
    };

    const handlesignin = async () => {
        console.log("clicked");
        try {
            const res = await Api.post('/login', { ...userInfo }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.result) {
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
                    <Surface style={styles.surface}>
                        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
                        <Text style={styles.text}>Welcome to Stock Portal</Text>
                        <Text style={styles.header}>Sign In</Text>
                        <View style={styles.form_container}>
                            <TextInput keyboardType='email-address' placeholder='Email' style={styles.input} onChangeText={value => handleOnChange(value, 'email')} value={email} />
                            <TextInput secureTextEntry={true} placeholder='Password' style={styles.input} onChangeText={value => handleOnChange(value, 'password')} value={password} />
                        </View>
                        <View style={styles.button_container}>
                            <Button style={styles.sign_button} onPress={handlesignin}><Text style={styles.b_text}>Sign In →</Text></Button>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text >Don't have an account?
                        <Button type="text"  onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>sign up</Text></Button>
                        </Text>
                        </View>
                        {/* 
                         <Text style={styles.errormsg}>{errormsg}</Text>
                            <Text style={styles.errormsg}>auth: {message}</Text><View style={styles.bottomback}>
                            <Button style={styles.buttond} onPress={() => navigation.navigate('Home')}><Text style={styles.b_text}>← Back</Text></Button>
                        </View> */}
                    </Surface>
                </View>
            </ImageBackground>
        </View>
    );
}

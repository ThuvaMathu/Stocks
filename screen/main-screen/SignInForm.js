import React, { useCallback, useState } from 'react';
import { ImageBackground, View, Image, Text, TextInput, SafeAreaView } from 'react-native';
import { Surface, Button, Divider, Snackbar } from 'react-native-paper';
import img from '../../assets/StockChart.png';
import himg from '../../assets/sbanner.png';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'
import { useLogin } from '../../context/LoginProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


export default function SignInForm({ navigation, route }) {

    useFocusEffect(
        useCallback(() => {
            if (route.params?.success) {
                setVisible(true)
            }

        }, [route])
    );

    const { setLoggedIn, setUserProfile } = useLogin();
    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [visible, setVisible] = useState(false);
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
            return true;
        }
    };


    const handlesignin = async () => {
        if (validate(email) && passValidator(password)) {
            try {
                const res = await Api.post('/login', { ...userInfo }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (res.data.result) {
                    await getData(email);
                    await AsyncStorage.setItem('@MyApp_user', JSON.stringify(res.data.user))
                    setUserInfo({ email: '', password: '' });
                    setErrormsg(res.data.message);
                    setUserProfile(res.data.user);
                    setLoggedIn(true)
                }

                //console.log(res.data);
            } catch (error) {
                if (error.response?.data) {
                    setErrormsg(error.response.data.message);
                } else setErrormsg("Somthing went wrong! Try again");

            }
        }
    };

    const getData = async (email) => {
        try {
            const res = await Api.post('/getData', { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.result) {
                let tempdata = JSON.parse(res.data.data)
                if (JSON.parse(res.data.data) !== null) {
                   await AsyncStorage.setItem('@MyApp_data', JSON.stringify(tempdata))
                }
            }
        } catch (error) {
            console.log(error, "slot error");

        }
    };
    const onDismissSnackBar = () => setVisible(false);
    return (

        <View style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <SafeAreaView>
                        <Surface style={styles.home_surface2}>
                            <View style={styles.navbar}>
                                <Image style={styles.sicon} source={himg} />
                                {/* <Ionicons style={styles.iconbar} name="arrow-back-circle-outline" size={40} color="#ffc23a" onPress={() => navigation.goBack()} /> */}
                            </View>
                            <Divider style={styles.divider} />
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
                                <Button type="text" onPress={() => navigation.navigate('Signup')} color="#ffc23a"><Text style={styles.l_text}>sign up</Text></Button>
                            </View>
                            <Button type="text" onPress={() => navigation.navigate('Help')} color="#ffc23a"><Text style={styles.l_text}>Help?</Text></Button>
                        </Surface>
                    </SafeAreaView>
                </View>
                <Snackbar
                    visible={visible}
                    duration={2500}
                    onDismiss={onDismissSnackBar}
                    style = {{color: 'white', backgroundColor:"#39d934", fontSize:18, marginHorizontal:10}}
                    >
                        <Text style={{fontSize:14,fontWeight:"bold",}}>
                        You have successfully created your account
                        </Text>
                   
                </Snackbar>
            </ImageBackground>
        </View>

    );
}

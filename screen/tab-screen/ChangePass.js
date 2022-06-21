import React from 'react';
import {View,ScrollView,Text, TextInput } from 'react-native';
import { Surface, Button} from 'react-native-paper';
import { useState } from 'react';
import { styles } from '../../stylesheet/style';
import Api from '../../api/Api'
import { useLogin } from '../../context/LoginProvider';



export default function ChangePassword({ navigation }) {

    const { userProfile } = useLogin();

    const [userInfo, setUserInfo] = useState({
        email: userProfile.email,
        password: '',
        newpassword: '',
    });

    const [error, setError] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [cpass, setCpass] = useState("");

    const {password, newpassword } = userInfo;

    const handleOnChange = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value });
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

    const handleupdate = async () => {
        if (passValidator(newpassword, cpass)) {
            try {
                const res = await Api.post('/cpass', { ...userInfo }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (res.data.result) {
                    setUserInfo({password: '', newpassword: '',cpass:'' });
                    setErrormsg(res.data.message);
                    navigation.goBack();
                }
                console.log(res.data);
            } catch (error) {
                if (error.response?.data) {
                    setErrormsg(error.response.data.message);
                } else setErrormsg("Somthing went wrong! Try again");
            }
        }
    };

    return (
      
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Surface style={styles.tab_surface}>
                   
                    <ScrollView style={styles.scrollView}>

                        <Text style={styles.header2}>Update Password</Text>
                        <View style={styles.form_container}>
                            <TextInput secureTextEntry={true} placeholder='Current Password' style={styles.input} onChangeText={value => handleOnChange(value, 'password')} value={password} />
                            <TextInput secureTextEntry={true} placeholder='new Password' style={styles.input} onChangeText={value => handleOnChange(value, 'newpassword')} value={newpassword} />
                            <TextInput secureTextEntry={true} placeholder='Confirm Password' style={styles.input} onChangeText={setCpass} value={cpass} />
                            <Text style={styles.errormsg}> {error && error}</Text>
                            <Text style={styles.errormsg}> {errormsg && errormsg}</Text>
                            <View style={styles.button_container}>
                                <Button style={styles.sign_button} onPress={handleupdate}><Text style={styles.b_text}>Update  →</Text></Button>
                            </View>
                        </View>
                        </ScrollView>
                        </Surface>
                </View>
        </View> 
    );
}

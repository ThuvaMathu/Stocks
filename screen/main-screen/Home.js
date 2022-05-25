import React, { useEffect, useState } from 'react';
import { ImageBackground, ActivityIndicator, View, ScrollView, Image, Text } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import img from '../../assets/login_bac.jpg';
import himg from '../../assets/sbanner.png';
import { Fontisto } from '@expo/vector-icons';
import { styles } from '../../stylesheet/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';


export default function HomeScreen({ navigation }) {
    const [temp, setTemp] = useState();
    const [loading, setLoading] = useState(false);
    const { setLoggedIn, setUserData } = useLogin();

    useEffect(() => {
        setLoading(true);
        
        const timeout = setTimeout(() => {
            getAllKeys();
            //setLoading(false);
            console.log('This will be called after 2 seconds');
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                setUserData(JSON.parse(value))
                setTemp(value);
                console.log(value, "data")
                setLoggedIn(true)
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
        }
    }

    const getAllKeys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            if (keys.length > 0) {
                getData(keys[0])
                console.log(keys, "keys")
            } else {
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
        }
    }

    return (

        <View style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                {
                    loading &&
                    <View style={styles.loader_container}>
                        <ActivityIndicator size="large" color="#e09d04" />
                    </View>
                }
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 50, position: 'relative' }}>
                    <Surface style={styles.home_surface}>
                        <View style={styles.navbar}>
                            <Image style={styles.sicon} source={himg} />
                            <Fontisto style={styles.iconbar} name="nav-icon-a" size={24} color="#ffc23a" onPress={() => navigation.navigate('Menu')} />
                        </View>
                        <Divider style={styles.divider} />
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.home_container}>
                                <Text style={styles.text}>IFN666 Stocks</Text>
                                <Text style={styles.p_text}>By Selvasothy T</Text>
                                <Image style={styles.stretch} source={himg} />
                            </View>
                            <View style={styles.discription}>
                                <Text style={styles.dis_head}>Discription</Text>
                                <Text style={styles.dis_para}>    Welcome to the Stock Market Portal.
                                    This mobile application will allow users to view and analyse stock market data.
                                    The application consists of two main interactive screens, e.g., a Search screen
                                    for searching items of interest and a My List screen for overviewing information
                                    about items of interest. We implement basic user management, including sign in
                                    and sign out functions, and protect your personal information using a password
                                    so that you can change to another device and continue to use the app as usual.</Text>
                            </View>

                        </ScrollView>
                    </Surface>
                </View>

            </ImageBackground>
        </View>




    );
}
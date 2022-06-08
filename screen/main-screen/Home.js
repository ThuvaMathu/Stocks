import React, { useEffect, useState } from 'react';
import { ImageBackground, ActivityIndicator, View, ScrollView, Image, Text } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import img from '../../assets/StockChart.png';

import himg from '../../assets/sbanner.png';
import { styles } from '../../stylesheet/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../../context/LoginProvider';
import { BarIndicator, } from 'react-native-indicators';

export default function HomeScreen({ navigation }) {

    const { setLoggedIn, setUserData, setUserProfile } = useLogin();
    const [state, setState] = useState({});
    useEffect(() => {
        const timeout = setTimeout(() => {
            getAllKeys();
        }, 1500);
        return () => {
            setState({});
            clearTimeout(timeout);
        }
    }, []);

    const getData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                setUserProfile(JSON.parse(value))
                try {
                    const data = await AsyncStorage.getItem("@MyApp_data")
                    if (data !== null) {
                        setUserData(JSON.parse(data))
                    } else console.log("Empty data1")
                } catch (e) {

                    console.log("Empty data2")
                }
                console.log(value, "profile")
                setLoggedIn(true)
            }
        } catch (e) {
            console.log(e, "error in store data")
        }
    }

    const getAllKeys = async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            if (keys.length > 0) {
                getData("@MyApp_user")
                //console.log(keys, "keys")
            } else {
                navigation.navigate("Signin")
            }
        } catch (e) {
            console.log(e, "error in store data")
        }
    }

    return (

        <View style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 90, position: 'relative' }}>
                    <Surface style={styles.home_surface}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.home_container}>
                                <Text style={styles.text}>IFN666 Stocks</Text>
                                <Text style={styles.p_text}>By Selvasothy T</Text>
                                <Image style={styles.stretch} source={himg} />
                            </View>
                            <BarIndicator color="#ffc23a" count={4} size={30} />
                        </ScrollView>
                    </Surface>
                </View>
            </ImageBackground>
        </View>




    );
}
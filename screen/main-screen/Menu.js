import React from 'react';
import { ImageBackground, View, StyleSheet, ScrollView, StatusBar, Image, Text } from 'react-native';
import { Surface, Button, Divider } from 'react-native-paper';
import img from '../../assets/login_bac.jpg';
import himg from '../../assets/sbanner.png';
import { Fontisto } from '@expo/vector-icons';
import { styles } from '../../stylesheet/style';
import { Ionicons } from '@expo/vector-icons';



export default function Menu({ navigation }) {


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
                            <View style={styles.home_container}>
                                <Text style={styles.text}>IFN666 Stocks</Text>
                            </View>
                            <View style={styles.menu_button_container}>
                                <Button style={styles.buttons_s} onPress={() => navigation.navigate('Signup')}><Text style={styles.b_text}>Sign UP</Text></Button>
                                <Button style={styles.buttons_l} onPress={() => navigation.navigate('Signin')}><Text style={styles.b_text}>Log in</Text></Button>
                            </View>
                            <View style={styles.menu_item}>
                            <Text style={styles.menu_head}>General</Text>
                            </View>
                            <Divider style={styles.divider2}/>
                            <View style={styles.menu_item}>
                            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Documents</Text></Button>
                            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>User guid</Text></Button>
                            <Button style={styles.info_button} type="text" onPress={() => navigation.navigate('Signup')}><Text style={styles.l_text}>Feature preview</Text></Button>
                            </View>
                        </ScrollView>
                    </Surface>
                </View>

            </ImageBackground>
        </View>




    );
}
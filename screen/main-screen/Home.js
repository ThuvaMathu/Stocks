import React from 'react';
import { ImageBackground, View,  StyleSheet, StatusBar, Text } from 'react-native';
import { Surface,Button } from 'react-native-paper';
import img from '../../assets/login_bac.jpg';
import { styles } from '../../stylesheet/style';



export default function HomeScreen({ navigation }) {


    return (

        <View style={styles.container}>
            <ImageBackground source={img} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Surface style={styles.surface}>
                        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
                        <Text style={styles.text}>Welcome to Stock Portal</Text>
                        <View style={styles.button_container}>
                        <Button style={styles.buttons} onPress={() => navigation.navigate('Signin')}><Text style={styles.b_text}>Sign In</Text></Button>
                        <Button style={styles.buttons} onPress={() => navigation.navigate('Signup')}><Text style={styles.b_text}>Sign Up</Text></Button>
                        </View>
                        {/* <Button style={styles.buttond} onPress={() => navigation.navigate('Demostack')}><Text style={styles.b_text}>Demo</Text></Button> */}
                        <Button style={styles.buttond} onPress={() => navigation.navigate('Nav')}><Text style={styles.b_text}>Direct Loginin</Text></Button>

                    </Surface>
                </View>

            </ImageBackground>
        </View>




    );
}
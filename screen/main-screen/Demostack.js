import React from "react";
import { ImageBackground, Button,  StyleSheet, Text, View } from "react-native";
import image2 from "../../assets/WelcomeImage.jpg"
const image = { uri: "https://wallpapercave.com/wp/wp8938157.jpg" };

export default function Demostack({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
                    <Text style={styles.text}>Inside</Text>
                    <Button
                        title="Go back"
                        onPress={() => navigation.navigate('Home')}
                    />
                </ImageBackground>
            </View>
        </>

    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    }
  });
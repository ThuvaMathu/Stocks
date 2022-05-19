import * as React from 'react';
import { View,Button,StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from './components/BottomNav';




function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <Text>Home Screen</Text>
      <Button
        title="Go to Main menu"
        onPress={() => navigation.navigate('Nav')}
      />
    </View>
  );
}



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'home!' }}/>
        <Stack.Screen name="Nav" component={Navigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
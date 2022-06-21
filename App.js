import * as React from 'react';
import { View, Button, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginProvider, { useLogin } from './context/LoginProvider';
import MainNav from './screen/MainNavigator';


const Stack = createNativeStackNavigator();
function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNav />
      </NavigationContainer>
    </LoginProvider>

  );
}
export default App;


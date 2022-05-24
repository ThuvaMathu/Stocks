import * as React from 'react';
import { View, Button, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginProvider, { useLogin } from './context/LoginProvider';
import Navigation from './components/BottomNav';
import Demostack from './screen/main-screen/Demostack';
import AuthForm from './screen/main-screen/AuthForm';
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





{/* <NavigationContainer>
  <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Auth" component={AuthForm} options={{ tabBarLabel: 'Authentication!' }} />
    <Stack.Screen name="Demostack" component={Demostack} options={{ tabBarLabel: 'home!' }} />
    <Stack.Screen name="Nav" component={Navigation} />
  </Stack.Navigator>
</NavigationContainer> */}
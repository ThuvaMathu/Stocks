import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';






const Stack = createNativeStackNavigator();

export default function AuthForm() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'home!' }}/>
        <Stack.Screen name="Signin" component={SignInForm} options={{ tabBarLabel: 'Signin!' }}/>
        <Stack.Screen name="Signup" component={SignUpForm} options={{ tabBarLabel: 'Signup!' }}/>
      </Stack.Navigator>
  );
}


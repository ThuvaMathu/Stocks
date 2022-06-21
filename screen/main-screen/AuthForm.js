import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import UserGuid from '../tab-screen/UserGuid';






const Stack = createNativeStackNavigator();

export default function AuthForm() {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'home!' }}/>
        <Stack.Screen name="Signin" component={SignInForm} options={{ tabBarLabel: 'Signin!' }}/>
        <Stack.Screen name="Signup" component={SignUpForm} options={{ tabBarLabel: 'Signup!' }}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }} >
                < Stack.Screen name="Help" component={UserGuid} options={{

                    headerShown: true,
                   
                    headerStyle: {
                        backgroundColor: '#ffc23a',
                    },
                    headerTintColor: 'white',
                    headerBackTitle: "back",
                    headerBackTitleStyle: { fontWeight: 'bold', fontSize: 18 },
                    headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
                }} />
            </Stack.Group>
      </Stack.Navigator>
  );
}


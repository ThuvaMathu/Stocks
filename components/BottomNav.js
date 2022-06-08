import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-paper';
import Stock from '../screen/tab-screen/Stocks';
import SearchStock from '../screen/tab-screen/SearchStocks';
import Demo from '../screen/tab-screen/Demo';
import Setting from '../screen/tab-screen/Setting';

const Tab = createBottomTabNavigator();

export default function Navigation({ navigation }) {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Stock') {
              iconName = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';
            }
            else if (route.name === 'SearchStock') {
              iconName = focused ? 'ios-search' : 'ios-search-outline';
            }
            else if (route.name === 'WatchList') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'menu' : 'menu-outline';
            }
            else if (route.name === 'Demo') {
              iconName = focused ? 'boat' : 'boat-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ffc23a',
          tabBarInactiveTintColor: 'gray',
          headerStyle: { backgroundColor: '#ffc23a' }
        })}
      >
        <Tab.Screen name="Stock" component={Stock} options={() => ({
          headerShown:false,
          headerTitle: "Stock",
          headerTitleStyle: { color: '#fff', fontSize:20, fontWeight:"800"},
        })} />
        <Tab.Screen name="SearchStock" component={SearchStock} options={() => ({
          headerTitle: "Search Stock",
          headerTitleStyle: { color: '#fff', fontSize:20, fontWeight:"800"},
        })}/>
        <Tab.Screen name="Settings" component={Setting} options={() => ({
          headerShown:false,
          headerTitle: "Stock portal",
          headerTitleStyle: { color: '#fff', fontSize:20, fontWeight:"800"},
        })} />
        {/* <Tab.Screen name="Demo" component={Demo} options={{ title: 'Demo' }}  />  */}
      </Tab.Navigator>
    </>
  );
}
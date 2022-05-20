import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native-paper';
import Stock from '../screen/Stocks';
import SearchStock from '../screen/SearchStocks';
import Demo from '../screen/Demo';
import WatchList from '../screen/WatchList';
import Setting from '../screen/Setting';

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
              else if (route.name === 'Setting') {
                iconName = focused ? 'ios-settings' : 'ios-settings-outline';
              }
              else if (route.name === 'Demo') {
                iconName = focused ? 'boat' : 'boat-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Stock" component={Stock} />
          <Tab.Screen name="SearchStock" component={SearchStock} />
          <Tab.Screen name="WatchList" component={WatchList} />
          <Tab.Screen name="Setting" component={Setting} />
          <Tab.Screen name="Demo" component={Demo} />
        </Tab.Navigator>
      
      
    </>
  );
}
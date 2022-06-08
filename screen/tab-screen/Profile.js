import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewStock from './ViewStock';
import { styles } from '../../stylesheet/style';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, Surface, Searchbar, Button,List } from 'react-native-paper';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useLogin } from '../../context/LoginProvider';



export default function Profile({ navigation, route }) {
    const { userData, setLoggedIn, userProfile } = useLogin();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Surface style={styles.tab_surface}>
                <ScrollView style={styles.scrollView}>
                  
                    <View style={styles.pro_table}>
                        <List.Item
                            title="Name:"
                            description = {userProfile.name}
                            titleStyle={styles.pro_cell_header_text}
                            descriptionStyle={styles.list_dis}
                        />
                         <List.Item
                            title="E-mail:"
                            description = {userProfile.email}
                            titleStyle={styles.pro_cell_header_text}
                            descriptionStyle={styles.list_dis}
                        />
                         <List.Item
                            title="ID:"
                            description = {userProfile.id}
                            titleStyle={styles.pro_cell_header_text}
                            descriptionStyle={styles.list_dis}
                        />
                         

                    </View>
                </ScrollView>
            </Surface>
        </View >
    );
}

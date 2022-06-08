import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewStock from './ViewStock';
import { styles } from '../../stylesheet/style';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, Surface, Searchbar, Button } from 'react-native-paper';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);


export default function UserGuid({ navigation, route }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Surface style={styles.tab_surface}>
                <ScrollView style={styles.scrollView}>
                    <View>
                        <Text>User Guid</Text>
                    </View>
                </ScrollView>
            </Surface>
        </View >
    );
}

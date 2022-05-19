import * as React from 'react';
import { Text,Button, View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Stockstyles as styles}  from '../stylesheet/style';
export default function Stock({ navigation }){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>This is home screen</Text>
        <Title>Stock</Title>
        <Button
        title="Next screen"
        onPress={() => navigation.navigate('Home')}
      />
      </View>
    );
  }
import * as React from 'react';
import { Text, View } from 'react-native';
import { Title } from 'react-native-paper';

export default function Stock() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This is home screen</Text>
        <Title>Title</Title>
      </View>
    );
  }
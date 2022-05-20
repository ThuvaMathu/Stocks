import * as React from 'react';
import { Text, Button, View } from 'react-native';

export default function Setting({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting</Text>
        <Button title="Log Out" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
  
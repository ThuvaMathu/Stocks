import * as React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Stockstyles as styles } from '../stylesheet/style';

import { Divider, Badge, Card, Paragraph } from 'react-native-paper';

export default function Stock({navigation}) {
    const data = [
        { Title: "John Doe", price: 45, increase: 25 },
        { Title: "Victor Wayne", price: 25, increase: 15 },
        { Title: "Jane Doe", price: 75, increase: 15 },
    ];
    return (
        <View style={{ flex: 1, backgroundColor:'balck' }}>
            {data.map((cardValue) => (
                <>
                    <Card style={{ width: '100%', display: 'flex', }}>
                        <Text style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop:10 }}>{cardValue.Title}  </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', }}>
                            <Text style={{ marginRight: 8 }}> {cardValue.price}</Text>
                            <Text style={{ marginRight: 8 }}>  <Badge > {cardValue.increase}</Badge></Text>
                        </View>
                    </Card>
                    <Divider />
                </>
            ))}
            <Button
                title="Next screen"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}
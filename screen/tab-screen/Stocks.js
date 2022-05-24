import * as React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';
import { styles } from '../../stylesheet/style';
import { DataTable } from 'react-native-paper';
import { Divider, Badge, Card, Paragraph } from 'react-native-paper';

export default function Stock({ navigation }) {
    const data = [
        { Title: "ADV", price: 45, increase: 25 },
        { Title: "AAPL", price: 25, increase: 15 },
        { Title: "BFG", price: 75, increase: 15 },
        { Title: "BFD", price: 45, increase: 25 },
        { Title: "ABC", price: 25, increase: 15 },
        { Title: "GOOL", price: 75, increase: 15 },
    ];
    return (
        <>
            <View style={{ flex: 1 }}>

                {data.map((cardValue) => (
                    <>
                        <DataTable.Row onPress={() => console.log('Pressed',cardValue.Title )} key={cardValue.Title}>
                            <DataTable.Cell>{cardValue.Title}</DataTable.Cell>
                            <DataTable.Cell numeric style={styles.price}> {cardValue.price} </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.increase} >
                                <Text style={styles.increase_text}>{cardValue.increase}</Text>
                            </DataTable.Cell>
                            
                        </DataTable.Row>
                    </>
                ))}
            </View>
            <Text style={styles.price}> sample text</Text>
        </>
    );
}
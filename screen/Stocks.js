import * as React from 'react';
import { Text, View } from 'react-native';
import { Divider, Badge, Card, Button, Paragraph } from 'react-native-paper';

export default function Stock() {
  const data = [
    { Title:  "John Doe" ,price:45 ,increase:25},
    { Title: "Victor Wayne" ,price:25,increase:15},
    { Title:  "Jane Doe" ,price:75,increase:15},
  ];
    return (
      <View style={{ flex: 1}}>
          {data.map((cardValue) => (
            <>
       <Card style={{width:'100%',display:'flex',}}>
  
       <Text style={{display:'flex',flexDirection:'column',justifyContent:'flex-start',marginTop:'14px'}}>{cardValue.Title}  </Text> 

    <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',}}>
    
     
      <Text style={{marginRight:8}}> {cardValue.price}</Text>
<Text style={{marginRight:8}}>  <Badge > {cardValue.increase}</Badge></Text>



    </View>
  </Card>
   <Divider />
   </>
  ))}
  
      </View>
    );
  }
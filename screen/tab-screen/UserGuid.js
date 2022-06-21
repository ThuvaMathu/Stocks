import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, LogBox } from 'react-native';
import { styles } from '../../stylesheet/style';
import { Button, Surface, Card, Title, Paragraph, Divider } from 'react-native-paper';
import signupS from '../../assets/user_guide/signupS.png'
import loginS from '../../assets/user_guide/loginS.png'
import cpassS from '../../assets/user_guide/cpassS.png'
import searchS from '../../assets/user_guide/searchS.png'
import deleteS from '../../assets/user_guide/deleteS.png'
import signoutS from '../../assets/user_guide/signoutS.png'
import viewS from '../../assets/user_guide/viewS.png'
import { Dividends } from 'finnhub';


export default function UserGuid({ navigation, route }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Surface style={styles.tab_surface}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Register" />
                            <Card.Cover source={signupS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Enter your full name in Full Name, email address in email and password in the password field.
                                </Paragraph>
                                <Paragraph style={styles.card_para}>2. Click "Sign up"</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Log In" />
                            <Card.Cover source={loginS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Enter their email address in email and password in the password field.
                                </Paragraph>
                                <Paragraph style={styles.card_para}>2. Click "Log In"</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Log Out" />
                            <Card.Cover source={signoutS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Go to Menu </Paragraph>
                                <Paragraph style={styles.card_para}>2. Click "Sign Out"</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Add a Symbol" />
                            <Card.Cover source={searchS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Select "Search Stock".</Paragraph>
                                <Paragraph style={styles.card_para}>2. Search symbols by scrolling or using the search box at the top</Paragraph>
                                <Paragraph style={styles.card_para}>3. Click any Symbol you want to add</Paragraph>

                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Delete Symbols" />
                            <Card.Cover source={deleteS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Long press the symbol that the user wishes to delete until the delete button appears.
                                </Paragraph>
                                <Paragraph style={styles.card_para}>2. Click "Delete Symbol"</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to View Stock Details" />
                            <Card.Cover source={viewS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Click on any of the stock symbols to learn more about it.
                                </Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <View style={styles.card_con}>
                        <Card elevation={2} style={styles.card}>
                            <Card.Title  titleStyle={styles.card_title} title="How to Change password" />
                            <Card.Cover source={cpassS} />
                            <Card.Content>
                                <Paragraph style={styles.card_para} >1. Go to Menu {"-->"} Change Password.</Paragraph>
                                <Paragraph style={styles.card_para} >2. Enter the current password and then the new password.</Paragraph>
                                <Paragraph style={styles.card_para}>3. Click "Update"</Paragraph>
                                <Paragraph style={styles.card_para} >4. You will be redirected back to the menu after successfully changing the current password.</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                   
                </ScrollView>
            </Surface>
        </View >
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StatusBar, VirtualizedList, FlatList, SafeAreaView, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewStock from './ViewStock';
import { styles } from '../../stylesheet/style';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, Surface, Searchbar, Button, Modal, Portal, Provider } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { useLogin } from '../../context/LoginProvider';
import Api from '../../api/Api';
import { LogBox } from 'react-native';
import { BarIndicator, } from 'react-native-indicators';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);


function StockScreen({ navigation, route }) {


    //{ "symbol": "AAPL", "c": 148.84, "d": -0.8, "dp": -0.5346, "h": 150.66, "l": 146.84, "o": 149.07, "pc": 149.64, "t": 1654027205 }
    const { userProfile } = useLogin();
    const [rowdata, setRowdata] = useState([]);
    const [addSymbol, setAddSymbol] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statement, setStatement] = useState();
    const [init, setInit] = useState(false);

    let row = [];
    let prevOpenedRow;

    useEffect(() => {
        setAddSymbol(false)
        //setRowdata([])
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        if (route.params?.click) {
            fetchone(route.params?.symbol);
        } else getData();
    }, [route.params]);



    const fetchdata = async (temp) => {
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "c96jtgqad3icjtt5skjg"
        const finnhubClient = new finnhub.DefaultApi()
        temp.forEach(element => {
            finnhubClient.quote(element, (error, data, response) => {
                //console.log(response, "res data");

                if (response.body.c > 0 && response.body.d != null) {
                    let symbol = { symbol: element }
                    let assign = Object.assign(symbol, response.body);
                    setRowdata(obj => [...obj, assign])
                }
            });
        });
        //setLoading(true)
    };

    function exists(check) {
        return rowdata.some(function (el) {
            return el.symbol === check;
        });
    }
    
    const fetchone = async (temp) => {
        console.log("res hit data");
        const finnhub = require('finnhub');
        const api_key = finnhub.ApiClient.instance.authentications['api_key'];
        api_key.apiKey = "c96jtgqad3icjtt5skjg"
        const finnhubClient = new finnhub.DefaultApi()
        if (!exists(temp)) {
            finnhubClient.quote(temp, (error, data, response) => {
                // console.log(response, "res data");
                if (response.body.c > 0 && response.body.d != null) {
                    let symbol = { symbol: temp }
                    let assign = Object.assign(symbol, response.body);
                    setRowdata(obj => [...obj, assign])
                    setAddSymbol(false)
                    setLoading(true)
                }
                else if (error) {
                    setStatement("Somthing went wrong");
                    setLoading(false)

                }

            });
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@MyApp_data");
            if (jsonValue != null) {
                const temp = Object.values(JSON.parse(jsonValue));
                await fetchdata(temp).then((response) => setLoading(true))
                setLoading(true)
                console.log(temp, "initial store data");
            } else {
                setAddSymbol(true)
                setStatement("Somthing went wrong");
                console.log(jsonValue != null ? JSON.parse(jsonValue) : null, "example")
            }
        } catch (e) {
            console.log(e, "error in store data")
            setStatement("Somthing went wrong");
        }
    }

    const handleclick = (data) => {
        navigation.navigate("View", { symbol: data })
    };
    const hclick = (data) => {
        console.log(rowdata, "row data");

    };
    const renderItem = ({ item, index }, onClick) => {
        //console.log(item, "render")
        const closeRow = (index) => {
            console.log('closerow');
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            const trans = dragX.interpolate({
                inputRange: [0, 50, 100, 101],
                outputRange: [-20, 0, 0, 1],
            });
            //console.log(data, "right renter")
            return (
                <TouchableOpacity
                    onPress={onClick}
                    style={{
                        margin: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        backgroundColor: "red",
                    }}>
                    <MaterialIcons name="delete" size={28} color="#fff" />
                </TouchableOpacity >
            );
        };

        return (
            <View>
                <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.model_surface}>
                        <TouchableOpacity
                            style={{
                                margin: 0,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 80,
                                backgroundColor: "red",
                            }}>
                            <MaterialIcons name="delete" size={28} color="#fff" />
                        </TouchableOpacity >
                    </Modal>
                </Portal>
                <Swipeable
                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onClick)}
                    onSwipeableOpen={() => closeRow(index)}
                    ref={(ref) => (row[index] = ref)}
                    rightOpenValue={-100}
                    rightThreshold={0} >
                    <DataTable.Row style={styles.trow} onPress={() => handleclick(item.symbol)} onLongPress={() => showModal()} >
                        <DataTable.Cell style={styles.tcell} >
                            <Text style={styles.symbol}>{item.symbol}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cellrows} >
                            <Text style={styles.price}>{item.c}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={styles.cellrowe}>
                            <View style={item.dp < 0 ? styles.lowpc : styles.pc}>
                                <Text style={item.dp < 0 ? styles.lowpct : styles.pct}>{item.dp.toFixed(2)}%</Text>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>

                </Swipeable>
                </Provider>
            </View>

        );
    };

    const deleteItem = ({ item, index }) => {
        // console.log(rowdata[index], "symbol")
        console.log(rowdata, "before delete")
        async function d() {
            let a = rowdata;
            a.splice(index, 1);
            setRowdata([...a]);
            return;
        }
        d().then(async () => {
            const temp = rowdata.map(({ symbol }) => ({ [symbol]: symbol }));
            const temp2 = temp.reduce(((r, c) => Object.assign(r, c)), {})
            //console.log(temp, "temp")
            //console.log(temp2, "temp 2")
            await handledelet(temp2);
        });

    };

    const handledelet = async (temp) => {
        try {
            //console.log(temp, "delet handler")

            //console.log(Object.keys(temp).length === 0, "delet handler 22222222")

            await AsyncStorage.removeItem('@MyApp_data')
            if (Object.keys(temp).length !== 0) {
                await AsyncStorage.setItem("@MyApp_data", JSON.stringify(temp))
                    .then((data) => {
                        console.log(data, "from ste");
                        updateData(temp);
                    })
            }
            else {
                setAddSymbol(true)
                const data = null
                updateData(data)
            }


        } catch (error) {
            console.log(error, "error in merge data")
        }
    }

    const updateData = async (data) => {
        const email = userProfile.email;
        //console.log(data, "clicked updateData");
        try {
            const res = await Api.post('/userData', { email, data }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.result) {
                console.log(res.data.message, ": response from data")
            }
            console.log(res.data);
        } catch (error) {
            console.log(error, "slot error");
            console.log(error.response.data.message)
            //console.log(JSON.parse(error.response.data.userData.data))
        }
    }
    const getDatabase = async (email) => {
        console.log("clicked getData");
        try {
            const res = await Api.post('/getData', { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.result) {
                console.log(JSON.parse(JSON.parse(res.data.data)), "response from data")
            }
            //console.log(res.data);
        } catch (error) {
            console.log(error, "slot error");

        }
    };
    if (addSymbol) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={styles.tab_surface}>
                    <SafeAreaView style={styles.scrollView}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 200 }}>
                            <Text style={{ textAlign: "center", maxWidth: 200, fontSize: 16, fontWeight: '500' }} >Add symbol to see Stock Quotes and news</Text>
                            <Button Type='text' uppercase={false} onPress={() => navigation.navigate("SearchStock")}>
                                <Text style={{ color: '#ffc23a', fontSize: 18, fontWeight: "700" }} onPress={() => navigation.navigate("SearchStock")} >Add Symbol</Text>
                            </Button>
                        </View>

                    </SafeAreaView>
                </Surface>
            </View >
        )
    }
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <Provider>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={styles.tab_surface}>
                    {/* <Button style={styles.sign_button} onPress={() => hclick()}><Text style={styles.b_text}>Fetch</Text></Button> */}
                    <ScrollView style={styles.scrollView}>
                        <View>
                            {loading ? <FlatList
                                data={rowdata}
                                renderItem={(v) =>
                                    renderItem(v, () => {
                                        console.log('Pressed', v);
                                        deleteItem(v);
                                    })
                                }
                                keyExtractor={(item) => item.symbol} /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                {statement ?
                                    <Text style={styles.loading_state}>{statement}</Text> : <BarIndicator color="#ffc23a" count={4} size={40} />
                                }
                            </View>
                            }
                        </View>
                    </ScrollView>
                </Surface>
            </View >
        </Provider>
    );
}


const stack = createNativeStackNavigator();
export default function Stock() {
    return (
        < stack.Navigator initialRouteName="StockScreen" screenOptions={{ headerShown: false }}>
            < stack.Group>
                < stack.Screen name="StockScreen" component={StockScreen} />
            </ stack.Group>
            < stack.Group screenOptions={{ presentation: 'modal', headerShown: true }} >
                < stack.Screen name="View" component={ViewStock} options={({ route }) => ({
                    title: route.params.symbol,
                    headerStyle: {
                        backgroundColor: '#ffc23a',
                    },
                    //headerTintColor: 'red',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: 'black',

                    },
                })} />
            </ stack.Group>
        </ stack.Navigator>
    );
}

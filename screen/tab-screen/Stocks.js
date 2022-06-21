import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewStock from './ViewStock';
import { styles } from '../../stylesheet/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable, Surface, Button, Modal, Portal, Provider, Snackbar } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialIcons } from '@expo/vector-icons';
import { useLogin } from '../../context/LoginProvider';
import Api from '../../api/Api';
import { LogBox } from 'react-native';
import { BarIndicator, } from 'react-native-indicators';
import { ScrollView } from 'react-native-virtualized-view';
function StockScreen({ navigation, route }) {

    const { userProfile } = useLogin();
    const [rowdata, setRowdata] = useState([]);
    const [addSymbol, setAddSymbol] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statement, setStatement] = useState();
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const [deleteindex, setDeleteindex] = useState(null);
    const [show, setShow] = useState(true);
    const [errormsg, setErrormsg] = useState();
    const [snakstatement, setSnakstatement] = useState();
    const [snakcolor, setSnakcolor] = useState("#f5ce7a");
    let row = [];
    let prevOpenedRow;
    const API_KEY = "c96jtgqad3icjtt5skjg"

    useEffect(() => {
        let data = [];
        async function fetchInit() {
            setStatement()
            setErrormsg()
            setAddSymbol(false)
            setLoading(false)
            setRowdata([])
            data = await getData()
            setRowdata(data);
            return Promise.resolve(true)
        }
        if (route.params?.click) {
            fetchone(route.params?.symbol);
        } else {
            fetchInit().then(isresolved => {
                if (isresolved) {
                    setTimeout(() => {
                        if (data.length > 0) setLoading(true);
                    }, 1500);
                }
            })
        }
    }, [route.params]);

    function exists(check) {
        return rowdata.some(function (el) {
            return el.symbol === check;
        });
    };

    const fetchone = async (temp) => {
        setLoading(true)
        let url = `https://finnhub.io/api/v1/quote?symbol=${temp}&token=${API_KEY}`
        if (!exists(temp)) {
            try {
                let res = await fetch(url);
                let data = await res.json();
                if (data.c > 0 && data.d != null) {
                    let symbol = { symbol: temp }
                    let assign = Object.assign(symbol, data);
                    setRowdata(obj => [...obj, assign])
                    setAddSymbol(false)
                    setLoading(true)
                    //console.log(data, "new fetch")
                } else {
                    setStatement("Somthing went wrong! Try again");
                    setLoading(false)
                }
                //console.log(data, "new fetch")
            }
            catch (err) {
                console.error(err)
                setStatement("Error in fetching Data");
                setLoading(false)
            }
        } else {
            setSnakstatement("This Symbol is already on the list")
            setVisible2(true)
        }
    };
    const getData = async () => {
        let tempObj = []
        try {
            const jsonValue = await AsyncStorage.getItem("@MyApp_data");
            if (jsonValue != null) {
                const temp = Object.values(JSON.parse(jsonValue));
                temp.forEach(async (element) => {
                    let res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${element}&token=${API_KEY}`);
                    let data = await res.json();
                    if (data.c > 0 && data.d != null) {
                        let symbol = { symbol: element }
                        let assign = Object.assign(symbol, data);
                        setRowdata(obj => [...obj, assign])
                        tempObj.push(assign);
                    }
                    else if (data.error) {
                        setStatement("No data found!");
                    }
                    else setStatement("Error in fetching Data");
                });
            } else {
                setAddSymbol(true)
                setStatement("Somthing went wrong");

            }
        } catch (e) {
            console.log(e, "error in store data")
            setStatement("Somthing went wrong");
        }

        return tempObj
    };

    const handleclick = (data) => {
        navigation.navigate("View", { symbol: data })
    };

    const handledelete = async (temp, refetch) => {
        try {
            await AsyncStorage.removeItem('@MyApp_data')
            if (Object.keys(temp).length !== 0) {
                //console.log(rowdata, "enter setitem")
                await AsyncStorage.setItem("@MyApp_data", JSON.stringify(temp))
                    .then((data) => { updateData(temp); })
            }
            else {
                setAddSymbol(true)
                const data = null
                updateData(data)
            }
        } catch (error) {
            snakparam("#f57a7a", "Failed to delete symbol")
            fetchone(refetch)
            console.log(error, "Failed to delete symbol")
        }
    };
    const snakparam = (color, statement) => {
        setVisible2(true)
        setSnakcolor(color)
        setSnakstatement(statement)
    }

    const updateData = async (tempdata) => {
        let data;
        if (tempdata === null) data = tempdata
        else data = JSON.stringify(tempdata)
        const email = userProfile.email;
        try {
            const res = await Api.post('/userData', { email, data }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.data.result) {
                // console.log(res.data.message, ": response from data")
            }
            //console.log(res.data);
        } catch (error) {
            console.log(error, "slot error");
            if (error.response?.data) {
                setErrormsg(error.response.data.message);
            } else setErrormsg("Somthing went wrong! Try again");
        }
    }



    const renderItem = ({ item, index }, onClick) => {
        //console.log(item, "render")
        const closeRow = (index) => {
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
                <Swipeable
                    renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, onClick)}
                    onSwipeableOpen={() => closeRow(index)}
                    ref={(ref) => (row[index] = ref)}
                    rightOpenValue={-100}
                    rightThreshold={0} >
                    <DataTable.Row style={styles.trow} onPress={() => handleclick(item.symbol)} onLongPress={() => { showModal(), setDeleteindex(index) }} >
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
            </View>
        );
    };

    const deleteItem = ({ item, index }) => {
        const notdelete = rowdata[index].symbol
        async function d() {
            let a = rowdata;
            a.splice(index, 1);
            setRowdata([...a]);
            return;
        }
        d().then(async () => {

            const temp = rowdata.map(({ symbol }) => ({ [symbol]: symbol }));
            const temp2 = temp.reduce(((r, c) => Object.assign(r, c)), {})
            await handledelete(temp2, notdelete);
        });
    };

    const deletebyindex = () => {
        const notdelete = rowdata[deleteindex].symbol
        async function d() {
            let a = rowdata;
            a.splice(deleteindex, 1);
            setRowdata([...a]);
            setVisible(false)
            return;
        }
        d().then(async () => {
            const temp = rowdata.map(({ symbol }) => ({ [symbol]: symbol }));
            const temp2 = temp.reduce(((r, c) => Object.assign(r, c)), {})
            await handledelete(temp2, notdelete);
        });
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
    const onDismissSnackBar = () => setVisible2(false);
    if (errormsg) {
        return (
            <Surface style={styles.tab_surface}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginHorizontal: 50 }}>
                    <Text style={styles.loading_state}>{errormsg}</Text>
                </View>
            </Surface>
        )
    }
    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.model_surface}>
                    <TouchableOpacity onPress={() => deletebyindex()}>
                        <Surface style={styles.delete_surface}>
                            <MaterialIcons name="delete" size={28} color="red" />
                            <Text style={styles.delete_text}>Delete Symbol</Text>
                        </Surface>
                    </TouchableOpacity >
                </Modal>
            </Portal>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Surface style={styles.tab_surface}>
                    {/* <Button style={styles.sign_button} onPress={() => click()}><Text style={styles.b_text}>Fetch</Text></Button> */}
                    <ScrollView style={styles.scrollView}>
                        {loading ?

                            <FlatList
                                data={rowdata}
                                scrollEnabled={true}
                                renderItem={(v) => renderItem(v, () => { deleteItem(v) })}
                                keyExtractor={(item) => item.symbol} /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                {statement ?
                                    <Text style={styles.loading_state}>{statement}</Text> : <BarIndicator color="#ffc23a" count={4} size={40} />
                                }

                            </View>
                        }
                    </ScrollView>
                </Surface>
                <Snackbar visible={visible2} duration={2000} onDismiss={onDismissSnackBar} style={{ color: 'white', backgroundColor: snakcolor, fontSize: 18, marginHorizontal: 10 }} >
                    <Text style={{ fontSize: 18, fontWeight: "600", }}> {snakstatement}</Text>
                </Snackbar>
            </View >
        </Provider>
    );
}









const stack = createNativeStackNavigator();
export default function Stock() {
    return (
        < stack.Navigator initialRouteName="StockScreen" screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#ffc23a' } }}>
            < stack.Screen name="StockScreen" component={StockScreen} options={() => ({
                headerTitle: "Stock",
                headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
            })} />
            <stack.Group screenOptions={{ presentation: 'modal' }} >
                < stack.Screen name="View" component={ViewStock} options={({ route }) => ({

                    //headerShown: true,
                    title: route.params.symbol,
                    headerStyle: {
                        backgroundColor: '#ffc23a',
                    },
                    headerTintColor: 'white',
                    headerBackTitle: "back",
                    headerBackTitleStyle: { fontWeight: 'bold', fontSize: 18 },
                    headerTitleStyle: { color: '#fff', fontSize: 20, fontWeight: "800" },
                })} />
            </stack.Group>

        </ stack.Navigator>
    );
}

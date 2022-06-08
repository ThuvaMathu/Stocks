import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { styles } from '../../stylesheet/style';
import { DataTable, Surface, Searchbar, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../api/Api';
import { useLogin } from '../../context/LoginProvider';
import { BarIndicator, } from 'react-native-indicators';

export default function SearchStock({ navigation, route }) {

  useFocusEffect(
    useCallback(() => {
      setStatement();
      getdata();
      return () => {
      };
    }, [])
  );

  const { userProfile } = useLogin();
  const [rowdata, setRowdata] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [statement, setStatement] = useState();

  const onChangeSearch = (query) => {
    setSearchQuery(query)
    const filteredRows = filtered.filter((row) => {
      return row.symbol.toString().toLowerCase().includes(query.toString().toLowerCase());
    });
    if (filteredRows.length > 0) {
      console.log(filteredRows, "filter")
      setRowdata(filteredRows)
    }

  };

  const demo = [{
    "symbol": "RLJ",
    "name": "Activision Blizzard",
    "sector": "Communication Services",
    "subSector": "Communication Services",
    "headQuarter": "Santa Monica, CALIFORNIA",
    "dateFirstAdded": null,
    "cik": "0000718877",
    "founded": "1983-06-10"
  }, {
    "symbol": "HEQ",
    "name": "Adobe",
    "sector": "Technology",
    "subSector": "Technology",
    "headQuarter": "San Jose, CALIFORNIA",
    "dateFirstAdded": null,
    "cik": "0000796343",
    "founded": "1986-01-08"
  }, {
    "symbol": "GOOGL",
    "name": "ADP",
    "sector": "Industrials",
    "subSector": "Industrials",
    "headQuarter": "Roseland, NEW JERSEY",
    "dateFirstAdded": null,
    "cik": "0000008670",
    "founded": "1961-09-01"
  }]

  const API_KEY = 'f09e040716cb0920a7927288d97a5067'

  const getdata = async () => {
    let url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.length > 0) {
        //setFilterdata(data)
        setRowdata(data)
        setFiltered(data)
        setLoading(true)
      }
      else {
        setStatement("Somthing went wrong");
        setLoading(false)
      }
    }
    catch (err) {
      console.error(err)
      setStatement("Error in fetching Data");
    }
  }

  const checkData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@MyApp_data")
      if (jsonValue != null) {
        console.log(jsonValue, "initial store data")
        return jsonValue;
      } else return null
      console.log(jsonValue != null ? JSON.parse(jsonValue) : null, "example")
    } catch (e) {
      console.log(e, "error in store data")
      return null
    }
  }

  const handleclick = async (symbol) => {
    const jdata = checkData();
    const temp = { [symbol]: symbol }
    if (jdata != null) {
      try {
        await AsyncStorage.mergeItem("@MyApp_data", JSON.stringify(temp)).then(async () => {
          updateData(symbol);
        })
      } catch (error) {
        //console.log(error, "error in merge data")
      }
    } else {
      try {
        await AsyncStorage.setItem("@MyApp_data", JSON.stringify(temp)).then(async () => {
          updateData();
        })
      } catch (error) {
        console.log(error, "error in merge data")
      }
    }

  }

  const updateData = async (symbol) => {
    const data = await checkData();
    const email = userProfile.email;
    //console.log(data, "clicked updateData");
    try {
      const res = await Api.post('/userData', { email, data }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.result) {
        navigation.navigate('Stock', {
          screen: 'StockScreen',
          params: { click: true, symbol: symbol },
        });
        //console.log(res.data.message, ": response from data")
      }
      console.log(res.data);
    } catch (error) {
      console.log(error, "slot error");
      console.log(error.response.data.message)
      console.log(JSON.parse(error.response.data.userData.data))
    }
  }
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@MyApp_data')
    } catch (e) {

    }

    console.log('Done.')
  }
  return (
    <View style={{ flex: 1, }}>
      <Surface style={styles.tab_surface}>


        <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
        {/* <Button style={styles.sign_button} onPress={() => removeValue()}><Text style={styles.b_text}>get obj</Text></Button>  */}
        <ScrollView style={styles.scrollView}>
          {loading ?
            rowdata.map((cardValue, i) => (
              <DataTable.Row key={i} onPress={() => handleclick(cardValue.symbol)}>
                <DataTable.Cell style={styles.tcell} >
                  <View>
                    <Text style={styles.symbol}>{cardValue.symbol} </Text>
                    <Text style={styles.name}>{cardValue.name}</Text>
                  </View></DataTable.Cell>
              </DataTable.Row>
            )) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
              {statement ?
                  <Text style={styles.loading_state}>{statement}</Text> : <BarIndicator color="#ffc23a" count={4} size={40}/>
              }
            </View>
          }

        </ScrollView>
      </Surface>

    </View>

  );
}
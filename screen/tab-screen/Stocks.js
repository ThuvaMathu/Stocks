import React, { useState, useEffect, useRef } from 'react';
import { Text, Button,View, StyleSheet } from 'react-native';
import { styles } from '../../stylesheet/style';
import { DataTable } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import _ from 'lodash'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

export default function Stock({ navigation }) {
    const [rowdata, setRowdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [profile, setProfile] = useState();
  const [open, setOpen] = useState(false);
  const [showerror, setShowerror] = useState(false);
  const myRef = useRef(null)
  const [searchQuery, setSearchQuery] = React.useState('');
 
   const onChangeSearch = (query) => {
       console.log(query,"query")
       if(query){
        setSearchQuery(query)
        const filteredRows = rowdata.filter((row) => {
    
            return row.symbol.toString().toLowerCase().includes(searchQuery.toString().toLowerCase());
          });
          console.log(filteredRows,"77")
         
          if (searchQuery.length < 1) {
           const demo = rowdata
            setRowdata(demo)
            console.log(rowdata,'5555')
          }
          else {
            console.log(filteredRows,'4455')
            setRowdata(filteredRows)
          }
       }  else  {
        setSearchQuery()
        getdata()
        
       }
   
   };
  const API_KEY = 'f09e040716cb0920a7927288d97a5067A'

  async function getprofile(id) {
    let url = `https://financialmodelingprep.com/api/v3/profile/${id}?apikey=${API_KEY}`
    try {
      let res = await fetch(url);
      let data = await res.json();
      setProfile(data[0])
      if (data.length > 0) { setOpen(true); }
      else {
        toast.warn('There is no data available to display.');
      }
    }
    catch (err) {
      toast.error('There was an issue with retrieving data from the server.');
    }
  }

  async function getdata() {
    let url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`
    try {
      let res = await fetch(url);
      let data = await res.json();
      setRowdata(data)
      if (data.length > 0) { setLoading(false) }
      else {
        setShowerror(true)
        toast.warn('There is no data available to display.');
        setLoading(false)
      }
    }
    catch (err) {
      setShowerror(true)
      toast.error('There was an issue with retrieving data from the server.');
      setLoading(false)
    }
  }

  useEffect(() => {
    getdata();
  }, []);



    // const data = [
    //     { Title: "ADV", price: 45, increase: 25 },
    //     { Title: "AAPL", price: 25, increase: 15 },
    //     { Title: "BFG", price: 75, increase: 15 },
    //     { Title: "BFD", price: 45, increase: 25 },
    //     { Title: "ABC", price: 25, increase: 15 },
    //     { Title: "GOOL", price: 75, increase: 15 },
    // ];
    return (
        <>
            <View style={{ flex: 1 }}>
            <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
                {rowdata.map((cardValue) => (
                    <>
                        <DataTable.Row onPress={() => console.log('Pressed',cardValue.symbol )} key={cardValue.symbol}>
                            <DataTable.Cell>{cardValue.symbol}</DataTable.Cell>
                            {/* <DataTable.Cell numeric style={styles.price}> {cardValue.price} </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.increase} >
                                <Text style={styles.increase_text}>{cardValue.increase}</Text>
                            </DataTable.Cell> */}
                            
                        </DataTable.Row>
                    </>
                ))}
            </View>
            {/* <Text style={styles.price}> sample text</Text> */}
        </>
    );
}
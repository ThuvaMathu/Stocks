import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, Linking, LogBox, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../../stylesheet/style';
import { DataTable, Surface, Searchbar, Button, Divider } from 'react-native-paper';
import { BarIndicator, } from 'react-native-indicators';
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
LogBox.ignoreLogs([
  "Require cycle: node_modules/victory",
]);



export default function ViewStock({ navigation, route }) {

  useEffect(() => {
    async function fetchAll() {
      let symbol = route.params?.symbol;
      if (symbol) {
        setStatement();
        await fetchdata(symbol, "W");
        await fetchprofile(symbol);
        await fetchnews(symbol)
        return Promise.resolve(true)
      } else (navigation.navigate("Stock"))
    }
    fetchAll().then(isresolved => { isresolved && setMainLoader(true) })
    return () => {
      setMainLoader(false)
    }

  }, [route.params?.symbol]);

  const routeParams = route.params?.symbol;
  const [loading, setLoading] = useState(false);
  const [statement, setStatement] = useState();
  const [xaxis, setXaxis] = useState([null]);
  const [qData, setQData] = useState();
  const [profile, setProfile] = useState();
  const [news, setNews] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [chartloading, setchartloading] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })


  const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov",];

  function subtractYears(numOfYears, date = new Date()) {
    date.setFullYear(date.getFullYear() - numOfYears);
    return date;
  }
  const API_KEY = "c96jtgqad3icjtt5skjg"

  const fetchdata = async (temp, res) => {
    setchartloading(true)
    var dx = new Date();
    const currentDate = new Date();
    const to = Math.floor(currentDate.getTime() / 1000);
    const from = Math.floor(Date.parse((subtractYears(1))) / 1000)
    let url = `https://finnhub.io/api/v1/stock/candle?symbol=${temp}&resolution=${res}&from=${from}&to=${to}&token=${API_KEY}`
    let url2 = `https://finnhub.io/api/v1/quote?symbol=${temp}&token=${API_KEY}`
    try {
      let res = await fetch(url);
      let quo = await fetch(url2);
      let data = await res.json();
      let qdata = await quo.json();
      //console.log(data, "c view data")
      if (!data.error && data.s != 'no_data') {
        setXaxis(data.c)
        setQData(qdata)
        setchartloading(false)
        setLoading(true)
      }
      else {
        setStatement("Somthing went wrong");
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
      setStatement("Error in fetching Data");
    }
  };

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  const dateformater = (date) => {
    let month = pad2(date.getMonth() + 1);
    let day = pad2(date.getDate());
    let year = date.getFullYear();
    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate
  }

  const fetchone = async (temp, res) => {
    setchartloading(true)
    var dx = new Date();
    const currentDate = new Date();
    const to = Math.floor(currentDate.getTime() / 1000);
    const from = Math.floor(Date.parse((subtractYears(1))) / 1000)
    let url = `https://finnhub.io/api/v1/stock/candle?symbol=${temp}&resolution=${res}&from=${from}&to=${to}&token=${API_KEY}`
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.s === 'ok') {
        setXaxis(data.c)
        setLoading(true)
        setchartloading(false)
      }
      else {
        setStatement("Somthing went wrong");
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
      setStatement("Error in fetching Data");
    }
  };

  const fetchnews = async (temp) => {
    const myCurrentDate = new Date();
    const to = dateformater(myCurrentDate).toString()
    var myPastDate = new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 3);
    const from = dateformater(myPastDate).toString()
    let news_url = `https://finnhub.io/api/v1/company-news?symbol=${temp}&from=${from}&to=${to}&token=${API_KEY}`
    try {
      let res = await fetch(news_url);
      let data = await res.json();
      if (!data.error) {
        //console.log(data, "news");
        setNews(data)
        setLoading2(true)
      }
    }
    catch (err) {
      console.error(err)
      setStatement("Error in fetching Data");
      setLoading(false)
    }
  };


  const fetchprofile = async (temp) => {
    let pro_url = `https://finnhub.io/api/v1/stock/profile2?symbol=${temp}&token=${API_KEY}`
    try {
      let res = await fetch(pro_url);
      let data = await res.json();
      if (data) {
        //console.log(data)
        setProfile(data)
      }
    }
    catch (err) {
      console.error(err)
      setStatement("Error in fetching Data");
      setLoading(false)
    }
  };


  const data = {
    labels: months,
    datasets: [{
      data: xaxis,
      color: (opacity = 2) => `rgba(3, 171, 3, ${opacity})`,
      strokeWidth: 4,
    }]
  };

  const decorator = () => {
    return tooltipPos.visible ? <View>
      <Svg>
        <Rect x={tooltipPos.x - 15}
          y={tooltipPos.y + 10}
          width="40"
          height="30"
        //fill="black"
        />
        <TextSVG
          x={tooltipPos.x + 5}
          y={tooltipPos.y + 30}
          fill="white"
          fontSize="16"
          fontWeight="bold"
          textAnchor="middle">
          {tooltipPos.value}
        </TextSVG>
      </Svg>
    </View> : null
  };

  const onDataPointClick = (data) => {
    let isSamePoint = (tooltipPos.x === data.x
      && tooltipPos.y === data.y)
    isSamePoint ? setTooltipPos((previousState) => {
      return {
        ...previousState,
        value: data.value,
        visible: !previousState.visible
      }
    })
      :
      setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });
  }
  const Unixformatter = (unix) => {
    const milliseconds = unix * 1000
    const dateObject = new Date(milliseconds)
    return dateObject.toLocaleString()
  }
  return (
    <View style={{ flex: 1, }}>
      <Surface style={styles.tab_surface}>
        <ScrollView style={styles.scrollView}>
          {
            mainLoader ?
              <View>
                {
                  xaxis != null &&

                  <View>
                    {loading ?
                      <View>
                        <View style={styles.chartcontainer}>
                          <View style={styles.header_con}>
                            <Text style={styles.chart_header_s} > {routeParams}</Text>
                            <Text style={styles.chart_header_n} > {profile?.name}</Text>
                            <View style={styles.linechart_con}>
                              {chartloading &&
                                <BarIndicator style={styles.chart_loading} color="white" count={4} size={20} />
                              }
                            </View>
                          </View>
                          <Divider />
                          <View style={styles.header_con}>
                            <Text style={styles.chart_header_n} > {qData?.c}</Text>
                            <Text style={qData.dp < 0 ? styles.redlable : styles.greenlable} > {qData?.dp}</Text>
                          </View>
                          <View style={styles.header_con}>
                            <Text style={styles.chart_header_E} > {profile?.exchange}</Text>
                            <Text style={styles.chart_header_E} > {profile?.currency}</Text>
                          </View>
                          <Divider />
                          <View style={styles.chartres}>

                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "5")}>5</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "15")}>15</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "30")}>30</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "60")}>60</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "D")}>D</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "W")}>W</Text>
                            <Text style={styles.res_button} onPress={() => fetchone(routeParams, "M")}>M</Text>
                          </View>
                          <View>
                            <LineChart
                              data={data}
                              width={Dimensions.get("window").width - 50}
                              height={220}
                              yAxisInterval={100}
                              xAxisInterval={100}
                              chartConfig={{
                                backgroundGradientFrom: "#fce0a4",
                                backgroundGradientTo: "#f7e4ba",
                                decimalPlaces: 1,
                                color: (opacity = 1) => `rgba(242, 40, 5, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(242, 40, 5, ${opacity})`,
                                style: {
                                  fontSize: 18,
                                  borderRadius: 0,
                                },
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "2",
                                  stroke: "#04c91e"
                                }
                              }}
                              style={{
                                marginVertical: 10,
                                marginLeft: 10,
                                marginTop: 10,
                                borderRadius: 10
                              }}
                              verticalLabelRotation={35}
                              decorator={decorator}
                              onDataPointClick={onDataPointClick}
                            />

                          </View>
                          <View style={styles.quoteContainer}>
                            <DataTable.Row>
                              <DataTable.Cell><Text style={styles.key}>Colse</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.pc}</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.key}>Oppen</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.o}</Text></DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                              <DataTable.Cell><Text style={styles.key}>High</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.h}</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.key}>Low</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.l}</Text></DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                              <DataTable.Cell><Text style={styles.key}>change</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.pc}</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.key}>Volume</Text></DataTable.Cell>
                              <DataTable.Cell><Text style={styles.value}>{qData.t}</Text></DataTable.Cell>
                            </DataTable.Row>
                            <View>

                              {
                                loading2 &&
                                <View>
                                  <View style={styles.newscontainer}>
                                    <Text style={styles.newstop}>Top Stories</Text>
                                    <Text style={styles.newdd}>  From  <Image
                                      style={styles.tinyLogo}
                                      source={{
                                        uri: profile?.logo,
                                      }} /> News</Text>
                                  </View>

                                  {
                                    news.map((rows, i) => (

                                      rows?.image != "" &&
                                      <TouchableOpacity key={i} style={styles.news_header_con} onPress={() => { Linking.openURL(rows.url) }}>
                                        <View style={styles.news_header_con_in}>
                                          <View style={styles.newshead}>
                                            <Text style={styles.sourse}>{rows.source}</Text>
                                            <Text style={styles.headline}>{rows.headline}</Text>
                                          </View>
                                          <View style={[styles.newsimage, , styles.elevation]}>

                                            <Image
                                              style={[styles.newsLogo]}
                                              source={{
                                                uri: rows?.image,
                                              }}
                                            />

                                          </View>
                                        </View>
                                        <Divider style={styles.divider2} />
                                        <View>
                                          <Text style={styles.datetime}>{Unixformatter(rows.datetime)}</Text>
                                        </View>
                                      </TouchableOpacity>



                                    ))
                                  }
                                </View>
                              }
                            </View>
                          </View>

                        </View>
                      </View>
                      : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        {statement ?
                          <Text style={styles.loading_state}>{statement}</Text> : <BarIndicator color="#ffc23a" count={4} size={40} />
                        }
                      </View>
                    }

                  </View>}
              </View> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <BarIndicator color="#ffc23a" count={4} size={40} />
              </View>

          }
        </ScrollView>
      </Surface>
    </View>
  )
}

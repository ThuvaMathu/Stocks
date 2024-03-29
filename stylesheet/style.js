import { StyleSheet, I18nManager } from 'react-native';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },

  otherStyle: {
    position: 'absolute',
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
  },
  increase: {
    color: 'white',
    //marginRight:10,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  increase_text: {
    color: 'white',


  },
  price: {
    marginLeft: 100,
    flex: 1,
  },
  //==================== home  ========
  home_surface: {
    padding: 20,
    minHeight: 200,
    width:screenWidth -100,
    elevation: 6,
    borderRadius:20
    
  },
  home_surface2: {
    padding: 5,
    minHeight: 200,
    width:screenWidth -50,
    elevation: 6,
    borderRadius:20
    
  },
  stretch: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginBottom:20,
  },
  home_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  p_text: {
    color: '#ffc23a',
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 40,
    textAlign: "center",
  },
  // discription: {
  //   marginVertical: 20,
  //   marginHorizontal: 10,
  //   borderRadius: 10,
  //   backgroundColor: '#fcf2d9',
  //   justifyContent: "center",
  //   minHeight: 100,
  //   padding: 10,
  // },
  // dis_head: {
  //   color: '#e09d04',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  // },
  // dis_para: {
  //   marginLeft: 5,
  //   color: '#f5aa02',
  //   fontSize: 16,
  //   textAlign: "justify"
  // },
  navbar: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  iconbar: {
    position: 'absolute',
    right: 10,
  },
  sicon: {
    width: 40,
    height: 40,
    resizeMode: 'stretch',
  },
  divider: {
    height: 1,
    backgroundColor: '#ffc23a'
  },
  divider2: {
    height: 0.5,
    backgroundColor: '#e09d04'
  },
  menu_item: {
    marginHorizontal: 20,
  },
  menu_head: {
    color: '#e09d04',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  info_button: {
    alignItems: "left",
  },
  loader_container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 2,
  },
  //==================== Log in form  ========
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: '#ffc23a',
    fontSize: 36,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  surface: {
    padding: 5,
    minHeight: 350,
    width: 280,
    elevation: 6,
    borderRadius: 25,
  },
  buttons_s: {
    backgroundColor: '#e09d04',
    color: 'white',
    marginBottom: 20,
  },
  buttons_l: {
    backgroundColor: '#ffc23a',
    color: 'white',
    marginBottom: 10,
  },
  buttond: {
    marginTop: 40,
    backgroundColor: '#ffc23a',
    color: 'white',
  },
  b_text: {
    color: 'white',
    fontSize: 14,
    fontWeight: "bold",
  },

  button_container: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "flex-end",
    marginBottom: 50,
  },

  bottomback: {
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  menu_button_container: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  //==================== Signin Form ================= 
  header: {
    color: '#ffc23a',
    fontSize: 32,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  form_container: {
    alignItems: "center",
    marginHorizontal: 30,
    justifyContent: "center",
  },
  sign_button: {
    marginTop: 20,
    backgroundColor: '#39d934',
    color: 'white',
    padding: 6,
    borderRadius: 20,

  },
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    borderColor: "#ffc23a",
    padding: 10,
    borderRadius: 5,
  },

  errormsg: {
    color: 'red',
    textAlign: 'center',
  },

  info_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  l_text: {
    textAlign: "left",
    marginTop: 10,
    fontWeight: "bold",
    color: '#ffc23a',
  },

  //========================== Tab ===============

  tab_surface: {
    paddingVertical: 30,
    padding: 5,
    minHeight: '100%',
    width: '100%',
    elevation: 6,
    overflow: "scroll",
  },
  loading_state: {
    marginTop: 40,
    color: '#ffc23a',
    fontSize: 24,
    fontWeight: "bold",
  },

  //========================== stock ===============

  symbol: {
    fontSize: 18,
    fontWeight: "400",
  },

  price: {
    fontSize: 18,
    fontWeight: "400",

  },
  pc: {
    backgroundColor: 'rgb(11, 207, 8)',
    justifyContent: "flex-end",
    textAlign: "right",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
    width: 100,
  },
  lowpc: {
    justifyContent: "flex-end",
    textAlign: "right",
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    width: 100,
  },
  pct: {
    fontSize: 18,
    fontWeight: "400",
    backgroundColor: 'rgb(11, 207, 8)',
    color: 'white',
  },
  lowpct: {
    fontSize: 18,
    fontWeight: "400",
    backgroundColor: 'red',
    color: 'white',
  },
  name: {
    color: "rgb(73, 73, 73)",
  },
  tcell: {
    display: 'flex',
    justifyContent: "space-between",
  },
  cellrows: {
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center"
  },
  cellrowe: {
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "right",
    padding: 10,
  },
  trow: {
    backgroundColor: "#fff",
  },
  //========================== chart =========================

  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartres: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  rf_text: {
    color: "white",
    fontSize: 16,

  },
  res_button: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    backgroundColor: '#fca532',
    color: 'white',
    width: 35,
    height: 30,
    padding: 6,
    borderRadius: 10,
  },
  chartcontainer: {
    backgroundColor: '#ffc23a',
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 16,
  },
  quoteContainer: {
    marginHorizontal: 10,
  },
  chart_header_n: {
    fontSize: 16,
  },
  chart_header_E: {
    fontSize: 14,
    color: 'gray',
  },
  chart_header_s: {
    fontSize: 22,
    fontWeight: "bold",
  },
  header_con: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  redlable: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'red',
  },
  greenlable: {
    fontSize: 18,
    color: 'green',
    fontWeight: "bold",
  },
  dkeys: {
    // backgroundColor:'#fce0a4'

  },
  newscontainer: {
    marginHorizontal: 4,
  },
  newsLogo: {
    height: 110,
    width: 110,

    borderRadius: 8,
  },
  news_header_con: {
    //alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: '#f7e4ba',
    padding: 14,
    marginBottom: 6,
    borderRadius: 15,
  },
  news_header_con_in: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  newshead: {
    width: screenWidth / 2.1,
  },
  newsimage: {

  },
  newstop: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  tinyLogo: {
    height: 12,
    width: 12,
  },
  sourse: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  headline: {
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  datetime: {
    fontSize: 12,
    color: 'gray',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    shadowColor: '#fca532',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8
  },
  key: {
    color: '#171717',
    fontWeight: '400',
  },
  value: {
    color: '#cc5e04'
  },
  linechart_con:{
    position: 'relative',
    //width: '100%',
    //backgroundColor:"red"

  },
  chart_loading:{
    marginLeft:50,
  },

  //========================swipe==========
  leftAction: {
    flex: 1,
    backgroundColor: '#311e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    width: 20,
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
    width: 100,
  },
  //========================Profile==========
  pro_name: {
    fontSize: 24,
    color: '#ffc23a',
    fontWeight: "800"
  },
  pro_email: {
    fontSize: 14,
    color: '#ffc23a',
    fontWeight: "500"

  },
  pro_surface: {
    padding: 8,
    minHeight: 130,
    width: screenWidth - 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    borderRadius: 10,
    marginVertical: 50,
  },
  list_titel: {
    fontSize: 20,
    color: '#ffc23a',
    fontWeight: "700"
  },
  list_titel_signout: {
    fontSize: 20,
    color: 'red',
    fontWeight: "500"
  },
  pro_img: {
    height: 80,
    width: 80,
    marginBottom: 15,
  },
  pro_table: {
    marginVertical: 20,
    marginHorizontal: 20
  },
  pro_cell_header: {
    padding: 5,
    //justifyContent: "flex-start",
    alignItems: 'center',    
  },
  pro_cell: {
    padding:5,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  pro_cell_header_text: {
      fontSize:22,
      fontWeight: '800',
      color:"#ffc23a"
  },
  list_dis: {
    fontSize:20,
    color:"#fca532",
    marginLeft:20,
    fontWeight: 'bold',

},
///================================
model_surface: {
  justifyContent: "center",
  alignItems: 'center',
},

delete_surface:{
  justifyContent: "center",
  alignItems: 'center',
  padding:20,
  flexDirection:'row',
  borderRadius:10,
  
},
delete_text:{
  fontSize:20,
  fontWeight:"500",
  color:"red"
}

});


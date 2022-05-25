import { StyleSheet } from 'react-native'; 

 export const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },

  otherStyle: {
    position: 'absolute',
    justifyContent: 'center',
  },

  title:{
    fontFamily: 'Helvetica',
    fontSize:20,
    fontWeight: 'bold',
  },
  increase:{
    color: 'white',
    //marginRight:10,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginHorizontal:10,
    marginVertical:10
  },
  increase_text:{
    color: 'white',
   
   
  },
  price:{
    marginLeft:100,
    flex:1,
  },
//==================== home  ========
home_surface: {
  padding: 5,
  minHeight: '88%',
  width: '100%',
  elevation: 6,
  overflow:"scroll",
},
stretch: {
  width: 150,
  height: 150,
  resizeMode: 'stretch',
},
home_container: {
  alignItems: "center", 
  justifyContent:"center",
 },
 p_text: {
  color:'#ffc23a',
  fontSize: 22,
  fontWeight:'bold',
  marginHorizontal:20,
  marginBottom:40,
  textAlign: "center",
},
discription: {
  marginVertical:20,
  marginHorizontal:10,
  borderRadius:10,
  backgroundColor:'#fcf2d9',
  justifyContent:"center",
  minHeight:100,
  padding:10,
 },
dis_head: {
  color:'#e09d04',
  fontWeight:'bold',
  fontSize:20,
},
dis_para: {
  marginLeft:5,
  color:'#f5aa02',
  fontSize:16,
  textAlign:"justify"
},
navbar: {
padding:10,
flexDirection: "row",
alignItems: "center",
position: "relative",
},
iconbar: {
  position:'absolute',
  right:10,
},
sicon: {
  width: 40,
  height: 40,
  resizeMode: 'stretch',
},
divider: {
  height: 1,
  backgroundColor:'#ffc23a'
},
divider2: {
  height: 0.5,
  backgroundColor:'#e09d04'
},
menu_item:{
  marginHorizontal:20,
},
menu_head: {
  color:'#e09d04',
  fontWeight:'bold',
  fontSize:18,
  marginBottom:5,
},
info_button: {
  alignItems: "left",
},
loader_container:{
  height:'100%',
  width:'100%',
  position:'absolute',
  justifyContent: 'center',
  alignItems: "center",
  backgroundColor:'rgba(255, 255, 255, 0.8)',
  zIndex:2,
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
  color:'#ffc23a',
  fontSize: 36,
  marginHorizontal:20,
  marginBottom:10,
  marginTop:40,
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
  backgroundColor:'#e09d04',
  color:'white',
  marginBottom:20,
},
buttons_l: {
  backgroundColor:'#ffc23a',
  color:'white',
  marginBottom:10,
},
buttond: {
  marginTop:40,
  backgroundColor:'#ffc23a',
  color:'white',
},
b_text: {
  color:'white',
  fontSize: 14,
  fontWeight: "bold",
},

button_container: {
  alignItems: "center", 
  flexDirection: "row",
  marginHorizontal:30,
  justifyContent:"flex-end",
  marginBottom:50,
},

bottomback:{
  position:"absolute",
  bottom:0,
  padding:20,
},
menu_button_container: {
  marginVertical:20,
  marginHorizontal:30,
},
//==================== Signin Form ================= 
header: {
  color:'#ffc23a',
  fontSize: 32,
  marginHorizontal:20,
  marginBottom:10,
  marginTop:20,
  fontWeight: "bold",
  textAlign: "center",
},
form_container: {
  alignItems: "center", 
  marginHorizontal:30,
  justifyContent:"center",
 },
sign_button: {
  marginTop:20,
  backgroundColor:'#ffc23a',
  color:'white',
  padding:6,
  borderRadius:20,
  
},
input: {
  height: 40,
  width: "100%",
  margin: 12,
  borderWidth: 1,
  borderColor:"#ffc23a",
  padding: 10,
  borderRadius:5,
},

errormsg: {
color:'red',
textAlign:'center',
},

info_container: {
  flexDirection: "row",
  alignItems: "center", 
  justifyContent:"center",
  marginBottom:10,
 },

 l_text: {
   textAlign:"left",
   marginTop:10,
   fontWeight: "bold",
   color:'#ffc23a',
 },

 //========================== Tab ===============

 tab_surface: {
    paddingVertical:30,
    padding: 5,
    minHeight: '100%',
    width: '100%',
    elevation: 6,
    overflow:"scroll",
},





});


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
buttons: {
  marginTop:40,
  backgroundColor:'#ffc23a',
  color:'white',
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
  borderRadius:10,
},
errormsg: {
color:'red',
},
info_container: {
  alignItems: "center", 
  justifyContent:"center",
 },
 l_text: {
   fontWeight: "bold",
   color:'#ffc23a',
 }
});
import { StyleSheet } from 'react-native'; 

 export const Stockstyles = StyleSheet.create({
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
  }

});
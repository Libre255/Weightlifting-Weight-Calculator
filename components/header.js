import React from 'react'
import {StyleSheet, View, Text, Button, Image, TouchableHighlight} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

export default function Header() {
  return (
    <View style={style.headerBox}>
      <TouchableHighlight onPress={()=> console.log("img Pressed")}>
        <Image onPress={()=> console.log("menu pressed")} style={style.menuIcon} source={require('../assets/mobile-menu.png')}/>
      </TouchableHighlight>
      <Text style={style.mainTitle} >Plates Calc</Text>
    </View>
  )
}

let style = StyleSheet.create({
  headerBox:{
    marginTop:verticalScale(30),
    width:scale(350),
    height:verticalScale(100),
    borderWidth: 5,
    backgroundColor:'black',
    textAlign:'center',
    display:'flex',
    flexDirection:'row'
  },
  menuIcon:{
    width:scale(45),
    height:verticalScale(45),
    marginTop:verticalScale(20)
  },
  mainTitle:{
    paddingTop:scale(25),
    marginLeft:verticalScale(75),
    fontSize:scale(25),
    color:'white'
  },

})
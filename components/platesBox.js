import React from 'react'
import {View, StyleSheet,  Text} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

export default function PlatesBox({plateInfo}) {
  let styleArr = [style.PlatesStyle, {backgroundColor:plateInfo.BgC}]

  return (
    <View style={styleArr }>
        <Text style={{fontWeight:'bold', fontSize:scale(18)}}>{plateInfo.kg} x {plateInfo.amount} </Text>
    </View>
  )
}

let style = StyleSheet.create({
  PlatesStyle:{
    width:scale(80),
    height:verticalScale(80),
    borderWidth:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:scale(5)
  }
})
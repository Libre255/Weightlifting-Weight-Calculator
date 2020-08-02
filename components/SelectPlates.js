import React, {useState} from 'react'
import {SafeAreaView, Image, TextInput, StyleSheet, View, FlatList, Button, Text, TouchableHighlight} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

const PlateSelectionBoxes = ({myplateBox, setSelectNrPlates, addCalcPlate})=>{
  let [nrPlates, setnrPlates] = addCalcPlate //The Plates that going to be used to calculate
  let clickedEffect = myplateBox.pressed ? {width:37, height:37, borderColor:'black', borderRadius:13, borderWidth:2} : ""
  let styleArr = [style.btnPlate, {backgroundColor:myplateBox.color}, clickedEffect]

  function platePress(NrPressed, changeFunction) {
    //myPlateBox === NrPressed  && changeFunction === setSelectNrPlates
    changeFunction(value => value.map(plate => {
      if(plate.nr === NrPressed.nr){ 
        plate.pressed = !NrPressed.pressed
      }
      return plate
    }))
  
    if(NrPressed.pressed){
      setnrPlates(value => [...value, NrPressed])
    }
    else{
      setnrPlates(plates2Calc => plates2Calc.map(plate => plate.kg !== NrPressed.kg))
    }
  }

  return(
    <TouchableHighlight onPress={()=> platePress(myplateBox, setSelectNrPlates)}>
      <View style={styleArr}>
        <Text>{myplateBox.nr}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default function SelectPlates({myFunc}) {
  let [resetOnChangeInput, CalculateWeight, btnPower, setSelectNrPlates, selectNrPlates, nrPlates, setnrPlates, cantDivide] = myFunc
  
  return (
    <View>
      <View style={style.plateSelectionBtn}>
        <FlatList
          horizontal={true}
          data={selectNrPlates}
          renderItem={({item}) => <PlateSelectionBoxes myplateBox={item} setSelectNrPlates={setSelectNrPlates} addCalcPlate={[nrPlates, setnrPlates]} />}
          keyExtractor={(item, index)=> index.toString()}
        />
      </View>
      <SafeAreaView style={style.inputDivBox}>
        <TextInput keyboardType="decimal-pad" style={style.inputBox} onChangeText={value => resetOnChangeInput(value)}></TextInput>
        <Button disabled={btnPower} title="Ok" onPress={CalculateWeight}/>
      </SafeAreaView>
      <Text style={style.warningText}>{cantDivide}</Text>
    </View>
    
  )
}

let style = StyleSheet.create({
  warningText:{
    textAlign:'center',
    fontWeight:'bold',
    padding:5
  },
  inputDivBox:{
    paddingTop:50,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  inputBox:{
    height:scale(40),
    borderColor:'black',
    borderWidth:1,
    width:verticalScale(120),
    marginRight:15
  },
  plateSelectionBtn:{
    paddingTop:10,
    height:60,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  btnPlate:{
    width:44,
    height:44,
    borderWidth:2,
    borderColor:'#d1d1d1',
    margin:5,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
})

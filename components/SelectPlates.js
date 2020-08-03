import React, {useState} from 'react'
import {SafeAreaView, Image, TextInput, StyleSheet, View, FlatList, Button, Text, TouchableHighlight} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 

const PlateSelectionBoxes = ({myplateBox, SelectedPlates, addCalcPlate})=>{
  let [nrPlates, setnrPlates] = addCalcPlate //The Plates that going to be used to calculate
  let clickedEffect = myplateBox.pressed ? {width:37, height:37, borderColor:'black', borderRadius:13, borderWidth:2} : ""
  let styleArr = [style.btnPlate, {backgroundColor:myplateBox.color}, clickedEffect]
  let [setSelectNrPlates, selectNrPlates] = SelectedPlates

  function platePress(NrPressed, changeFunction) {
    //NrPressed === myPlateBox && changeFunction === setSelectNrPlates
    // If i add then delet then add again plate i get an false array (bug)
    console.log(NrPressed);
    let copyArr = [...selectNrPlates]
    let index = copyArr.findIndex(item => item.nr === NrPressed.nr)
    copyArr[index].pressed = !NrPressed.pressed
    changeFunction(copyArr)
    

    if(NrPressed.pressed){
      setnrPlates(value => [...value, NrPressed])
      setnrPlates(value => value.sort((a, b) => b.nr - a.nr))
    }
    else if(NrPressed.pressed === false){
      //Problem lays here: when we take away a plate it returns false and adds fale to the nrPlates array 
      setnrPlates(plates2Calc => plates2Calc.filter(plate => plate.nr !== NrPressed.nr))
    }
    console.log('Current plates Selected State:');
    console.log(nrPlates);
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
          renderItem={({item}) => <PlateSelectionBoxes myplateBox={item} SelectedPlates={[setSelectNrPlates, selectNrPlates]} addCalcPlate={[nrPlates, setnrPlates]} />}
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

import React, {useState} from 'react'
import {SafeAreaView, Image, TextInput, StyleSheet, View, FlatList, Button, Alert} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 
import PlatesBox from './platesBox';
import SelectPlates from './SelectPlates';

export default function Body() {
  const [valueInput, setvalueInput] = useState(0)
  const [platesInfo, setPlatesInfo] = useState([])
  const [btnPower, setBtnPower] = useState(false)
  const [selectNrPlates, setSelectNrPlates] = useState([{nr:25, color:'#a60000', pressed:false},{nr:20, color:'#0013ff', pressed:false},{nr:15, color:'yellow', pressed:false},{nr:10, color:'#129603', pressed:false},{nr:5, color:'white', pressed:false},{nr:2.5, color:'#ff0000', pressed:false}, {nr:1.25, color:'#16d300', pressed:false}])
  const [nrPlates, setnrPlates] = useState([])
  const [cantDivide, setCantDivide] = useState('')
  //TO DO:
  //Reset Everything when someone Selects a plate
  function CalculateWeight(){
    let CurrentWeight = (valueInput - 20)/2 //also divide by 2 so you know how much each side needs
    console.log('Main Selected weigth: '+ CurrentWeight); //Starting Weigth
    
    //Starting calculating
    function checkDivision(myweigth) {
      let tryDivision;
      let FoundDivPlate = nrPlates.find(plate =>{
        tryDivision = Math.floor(myweigth / plate.nr) 
        if(tryDivision >= 1){
          return plate
        }
      })
      console.log('Try Division: ' + tryDivision)
      if(FoundDivPlate === undefined){
        setCantDivide('Write again your weight pls :)')
        return 'Cant Divide'
      }else{
        CurrentWeight = myweigth - (tryDivision * FoundDivPlate.nr)
        let AddingPlate = {kg:FoundDivPlate.nr, amount:tryDivision, BgC:FoundDivPlate.color}
        let myPlatesInfoV2 = []
        myPlatesInfoV2.push(AddingPlate)
        
        if(CurrentWeight > 0){
          setPlatesInfo(preValue=> [...preValue, ...myPlatesInfoV2])
          return CurrentWeight
        }else{
          setPlatesInfo(preValue=> [...preValue, ...myPlatesInfoV2])
          return 'Not more weigth left to count'
        }
      }
    }

    for(let i = 0; i <= CurrentWeight; i += 0.1){ //check the condition of the loop if you got error
      let theReturnWeigth = checkDivision(CurrentWeight) //It returns the weigth left to count
      console.log('restored weight left: '+theReturnWeigth);
      if(theReturnWeigth === 'Cant Divide'){
        Alert.alert(`Select more plates in order to calculate your Weigth.`, ` 
        Write again your Weigth.
        Current Weigth left to calculate: ${CurrentWeight}`)
        CurrentWeight = 0
      }
    }
    setBtnPower(true)
  }

  function resetOnChangeInput(value) {
    setvalueInput(value)
    setPlatesInfo([])
    setBtnPower(false)
    setCantDivide('')
  }
  return (
    <View>
      <SelectPlates myFunc={[resetOnChangeInput, CalculateWeight, btnPower, setSelectNrPlates, selectNrPlates, nrPlates, setnrPlates, cantDivide]}/>
      <View style={style.platesDivBox}>
        <View >
          <Image source={require('../assets/weights.png')} style={style.WeightIMG}/>
        </View>
        <View style={style.myPlates}>
          <FlatList
            data={platesInfo} 
            renderItem={({item, index})=> <PlatesBox plateInfo={item}></PlatesBox>}
            keyExtractor={(item, index)=> index.toString()}
          />
        </View>
      </View>
    </View>
  )
}

let style = StyleSheet.create({
  platesDivBox:{
    display:'flex',
    flexDirection:'row',
    marginTop:scale(20),
    margin:scale(20)
  },
  myPlates:{
    alignSelf:'flex-end'
  },
  WeightIMG:{aspectRatio: 1, resizeMode:'contain', transform:[{ rotate: '90deg'}]
  }
})
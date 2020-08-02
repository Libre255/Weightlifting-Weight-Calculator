import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, SafeAreaViewBase, SafeAreaViewComponent } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'; 
import Header from './components/header'
import Body from './components/body'

export default function App() {

  return (
    <SafeAreaView >
  
      <Header />
      <Body/>  
     
    </SafeAreaView>
  );
}



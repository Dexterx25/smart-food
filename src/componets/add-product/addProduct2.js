import React, { Component } from 'react'
import AddProductForm2 from './addProductFrom2'
import {StatusBar, ImageBackground, StyleSheet, Text, View } from "react-native";

//import Groups from './Groups'
class AddProduct2 extends Component {
  render () {
    const { navigation, props } = this.props

    return (
      
      <View style={{ flex: 1, backgroundColor: '#dac292', justifyContent:'center', display: 'flex' }}>

        
        
          <StatusBar barStyle='dark-content'  />
          
            
             <AddProductForm2 navigation={navigation} />
            
      </View>
    )
  }
}

export default AddProduct2

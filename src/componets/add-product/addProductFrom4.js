import React from 'react'
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from "react-native-image-picker"

import { colors, buttonPrimary, inputText } from '../../libs/styles';
import {
    handleHitSlop,
    handleMaxCharacters
  } from '../../libs/helpers';

export default class AddEventForm4 extends React.Component {
  state = {
    photo: null,
    photo2:null,
    photo3:null,
    photo4:null
  }

  componentDidMount(){
      const {navigation} = this.props
      const datas = navigation.getParam('values')
        console.warn('THIS IS THE DATAS--->', datas)

    }
    handleSubmit = () =>{
        const {navigation} = this.props
        const datas = navigation.getParam('values')
        const theImages =[this.state.photo, this.state.photo2, this.state.photo3,this.state.photo4]
     
       console.warn('DATAS FOR DETAILS--->',datas, theImages)
       // console.warn('THIS IS THE DATAS AGRUPED--->', datasAgruped)
        navigation.navigate('productDetail', {values:datas, photos:theImages})
    }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }
  handleChoosePhoto2 = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo2: response })
      }
    })
  }
  handleChoosePhoto3 = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo3: response })
      }
    })
  }
  handleChoosePhoto4 = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo4: response })
       }
    })
  }
  renderEventSkeleton() {
    return (
       <Image  source={require('../icon/images/PlaceHolderImage.png')} style={{width:'60%', height:'30%', borderRadius:100, padding:20}}/>
    );
  }
  renderEventSkeletonRest() {
    return (
       <Image  source={require('../icon/images/PlaceHolderImage.png')} style={{width:'70%', height:'30%', borderRadius:100, padding:10}}/>
    );
  }
  render() {
    const { photo, photo2, photo3, photo4 } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign:'center', backgroundColor:'#dac292'}}>
        {!photo ? this.renderEventSkeleton() : (
          <Image
            source={{ uri: photo.uri }}
            style={{width:'60%', height:'30%', borderRadius:70}}
            />
        )}
               
        <TouchableOpacity  style={styles.logOutButtom} onPress={this.handleChoosePhoto}>
            <Text styles={{fontSize:15}}>{'Escoge una foto'}</Text>
        </TouchableOpacity>
            <View  state={{paddingTop:10}} />
      {this.state.photo ? 
          <View style={{width:'100%', flexDirection:'row', height:'50%', justifyContent:'space-around', alignItems:'center', padding:-90, margin:-90}} >
                 
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo2 ?
                        this.renderEventSkeletonRest() : (   
                        <Image
                        source={{ uri: photo2.uri }}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        /> 
                        )      
                 }
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto2}>
            <Text styles={{fontSize:30}}>{'+'}</Text>
        </TouchableOpacity>
                 
             </View>
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo3 ?
                        this.renderEventSkeletonRest() : (
                            
                        <Image
                        source={{ uri: photo3.uri }}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        />
                       
                        )
                        
                        }
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto3}>
            <Text styles={{fontSize:30}} >{'+'}</Text>
        </TouchableOpacity>
             </View>
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo4 ?
                        this.renderEventSkeletonRest() : (
                            
                        <Image
                        source={{ uri: photo4.uri }}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        />
                       
                        )
                        
                    }
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto4}>
            <Text styles={{fontSize:30}} >{'+'}</Text>
        </TouchableOpacity> 
             </View>
             
        </View>
           
     : null }

    <View style={{paddingTop:20}} />
        <View style={styles.btnContent}>
                <TouchableOpacity
                  style={styles.buttonForm}
                  onPress={this.handleSubmit}
                  hitSlop={handleHitSlop(14)}
                >
                  <Image  source={require('../icon/images/nextIcon.jpeg')} style={{width:50, height:50, borderRadius:100}}/>
                </TouchableOpacity>
        </View>
    </View>
    )
  }
}
const styles = StyleSheet.create({
    check: {
      color: colors.green,
      position: 'absolute',
      bottom: 20,
      marginRight: 20,
      right: 1
    },
    logOutButtom: {
        marginBottom: 5,
        width: 150,
        height: 45,
        padding:10,
        margin:10,
        backgroundColor:"#ffe3b8",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 10
      },
      logOutButtom2: {
        marginBottom: 30,
        width:40,
        height: 40,

        backgroundColor:"#ffe3b8",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 100
      },
    inputIconOption:{
      position: 'relative',
      height: 20,
      bottom: 8
    },
    
    inputTextHide: {
      position: 'absolute',
      opacity: 0
    },
    inputCatAndr: {
      position: 'relative',
      zIndex: 50,
      paddingTop:30,
      color:'white',
      paddingBottom:30,
      marginLeft: 5,
      width: '100%',
    },
    inputSection: {
      marginTop: 55,
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderBottomWidth: 1,
      borderBottomColor: '#D8D8D8'
    },
    inputSectionDescription: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderBottomWidth: 1,
      borderBottomColor: '#D8D8D8'
    },
    inputText: {
      ...inputText,
      paddingLeft: 15,
      marginTop: 0,
      flexBasis: '80%',
      paddingRight: 0,
    },
    inputText2:{
      paddingLeft: 15,
      marginTop: 0,
      paddingRight: 0,
    },
    inputIcon: {
      position: 'relative',
      height: 20,
      bottom: 8
    },
    error: {
      color: colors.red,
      position: 'absolute',
      bottom: 20,
      marginRight: 20,
      right: 1
    },
    textSmall: {
      fontSize: 13,
      color: '#C4C4CB',
      textAlign: 'right',
      marginTop: 18,
      marginRight: 18
    },
    formTitle: {
      color: colors.purpleDark,
      fontSize: 30,
      fontWeight: '500'
    },
    errorText: {
      color: colors.red,
      fontSize: 13,
      marginTop: 3
    },
    container: {
      paddingTop:70,
      backgroundColor: '#dac292',
      justifyContent: 'flex-start',
      position: 'relative',
      flex: 1
    },
    icon: {
      color: colors.green,
      // paddingBottom: 25,
      marginLeft: 20,
      marginTop: 70
    },
    iconDate: {
      marginLeft: 10
    },
    formContent: {
      marginLeft: 35
    },
    buttonForm: {
      ...buttonPrimary,
      width: 42,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 0,
      paddingTop: 0,
      marginRight: 20
    },
    buttonForm2: {
      ...buttonPrimary,
      width: 250,
      height: 42,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
      paddingBottom: 0,
      paddingTop: 0,
      marginRight: 20
    },
    
    btnContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectContainer: {
      marginTop: 40,
      height: '100%',
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'space-between'
    },
    select: {
      height: 260,
      borderTopColor: '#D8D8D8',
      borderWidth: 1,
      width: '100%',
      bottom: 1,
      left: 0,
      position: 'absolute',
      backgroundColor: '#ffffff'
    },
    selectButton: {
      padding: 30,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    selectBtnText: {
      fontSize: 20,
      color: colors.green
    },
    maxCharacters: {
      position: 'absolute',
      right: 0,
      top: 2,
      color: '#D8D8D8',
      fontSize: 12
    }
  });
  

import React from 'react'
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable} from 'react-native'
//import ImagePicker from 'react-native-image-picker'
import * as ImagePicker from "react-native-image-picker"

import { colors, buttonPrimary, inputText } from '../../libs/styles';
import {
    handleHitSlop,
    handleMaxCharacters
  } from '../../libs/helpers';

export default  class PhotosEdit extends React.Component{
        state = {
            photo: null,
            photo2:null,
            photo3:null,
            photo4:null,
            imagesStates:[]
          }
          componentDidMount () {
              const {images, prevImages} = this.props
              console.warn('IMAGESSSS--->', images)
              console.warn('PREV IMAGES-->', prevImages)
            //   const imagesToTransfor = images.reduce((acc, item)=>{
                
            //     return acc
            //   },[])
              if(images.length){
                prevImages.find(e => e.position == 0) ?  this.setState({photo:prevImages.find(e => e.position == 0)}) : this.setState({photo:this.state.photo})
                 images[1] ? this.setState({photo2:images[1]}) : this.setState({photo2:this.state.photo2})
                 images[2] ? this.setState({photo3:images[2]}) : this.setState({photo3:this.state.photo3})
                 images[3] ? this.setState({photo4:images[3]}) : this.setState({photo4:this.state.photo4})
                
         
              }
          }
          handleChoosePhoto = () => {
            const options = {
              noData: true,
            }
            
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                const newObj = [response].reduce((acc, item)=>{
                    acc['fileName']=item.fileName
                    acc['fileSize'] = item.fileSize
                    acc['height']=item.height
                    acc['type'] = item.type
                    acc['src']=item.uri
                    acc['width']= item.width
                  return acc
                },{})
                this.setState({ photo: newObj })
              }
            })
          }
          handleChoosePhoto2 = () => {
            const options = {
              noData: true,
            }
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                const newObj = [response].reduce((acc, item)=>{
                  acc['fileName']=item.fileName
                  acc['fileSize'] = item.fileSize
                  acc['height']=item.height
                  acc['type'] = item.type
                  acc['src']=item.uri
                  acc['width']= item.width
                return acc
              },{})
              console.warn('NEW OBJ FOR PHOTO 2222--->', newObj)
                this.setState({ photo2: newObj })
              }
            })
          }
          handleChoosePhoto3 = () => {
            const options = {
              noData: true,
            }
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                const newObj = [response].reduce((acc, item)=>{
                  acc['fileName']=item.fileName
                  acc['fileSize'] = item.fileSize
                  acc['height']=item.height
                  acc['type'] = item.type
                  acc['src']=item.uri
                  acc['width']= item.width
                return acc
              },{})
                this.setState({ photo3: newObj })
              }
            })
          }
          renderEventSkeletonRest() {
            return (
               <Image  source={require('../icon/images/PlaceHolderImage.png')} style={{width:'70%', height:'30%', borderRadius:100, padding:10}}/>
            );
          }
          handleChoosePhoto4 = () => {
            const options = {
              noData: true,
            }
            ImagePicker.launchImageLibrary(options, response => {
              if (response.uri) {
                const newObj = [response].reduce((acc, item)=>{
                  acc['fileName']=item.fileName
                  acc['fileSize'] = item.fileSize
                  acc['height']=item.height
                  acc['type'] = item.type
                  acc['src']=item.uri
                  acc['width']= item.width
                return acc
              },{})
                this.setState({ photo4: newObj })
               }
            })
          }


    handleStateComponend = () =>{
        const {prevImages,handleCloseModal, handleChangeImages, images} = this.props
        const theImages =[this.state.photo, this.state.photo2, this.state.photo3,this.state.photo4]
        const theImagesDestruct = theImages.filter(e => e !== null)
        
        console.warn('DATAS FOR DETAILS--->', theImages)
        let stateAlter 
             if(theImagesDestruct.length !== prevImages.length ){
                  stateAlter = 'alterated'
                handleChangeImages(theImagesDestruct)
                handleCloseModal(stateAlter)
             }else{
                 stateAlter = 'not_alterated'
                handleChangeImages(theImagesDestruct)
                handleCloseModal(stateAlter)    
             }
    
          }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        const newObj = [response].reduce((acc, item)=>{
          acc['fileName']=item.fileName
          acc['fileSize'] = item.fileSize
          acc['height']=item.height
          acc['type'] = item.type
          acc['src']=item.uri
          acc['width']= item.width
        return acc
      },{})
        this.setState({ photo: newObj })
      }
    })
  }
  handleLessPhoto = ()=>{
    this.setState({photo:null})
  }
  handleLessPhoto2 = ()=>{
    this.setState({photo2:null})
  }
  handleLessPhoto3 = ()=>{
    this.setState({photo3:null})
  }
  handleLessPhoto4 = ()=>{
    this.setState({photo4:null})
  }
  

  

    render(){
 const { photo2, photo, photo3, photo4} = this.state
 console.warn('photos state---->', photo, photo2, photo3, photo4)
 const {images, prevImages} = this.props
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign:'center', width:'100%'
            }}>
                {!prevImages[0] || !photo ? 
                        this.renderEventSkeletonRest()

                      :  (   
                        <Image
                        source={{ uri: photo.src || photo.uri }}
                        style={{width:200, height:200, borderRadius:70}}
                        /> 
                        )      
                 }
       <View style={{flexDirection:'row'}}>        
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto}>
            <Text styles={{fontSize:15}}>{'+'}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.logOutButtom2,{marginLeft:10}]} onPress={this.handleLessPhoto}>
            <Text styles={{fontSize:15}}>{'-'}</Text>
        </TouchableOpacity>
       </View>       
               
        
          <View style={{width:'100%', flexDirection:'row', height:'50%', justifyContent:'space-around', alignItems:'center', padding:-90, margin:-90}} >
            

          
                 
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo2 ?
                        this.renderEventSkeletonRest() : (   
                        <Image
                        source={{ uri: photo2.src || photo2.uri }}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        /> 
                        )      
                 }
                 <View style={{flexDirection:'row'}}>
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto2}>
            <Text styles={{fontSize:30}}>{'+'}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={[styles.logOutButtom2,{marginLeft:10}]} onPress={this.handleLessPhoto2}>
            <Text styles={{fontSize:30}}>{'-'}</Text>
        </TouchableOpacity>
                </View>
             </View>
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo3 ?
                        this.renderEventSkeletonRest() : (
                            
                        <Image
                        source={{ uri: photo3.src || photo3.uri }}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        />
                       
                        )
                        
                        }
                        <View style={{flexDirection:'row'}}>
         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto3}>
            <Text styles={{fontSize:30}} >{'+'}</Text>
        </TouchableOpacity>

        <TouchableOpacity  style={[styles.logOutButtom2, {marginLeft:10}]} onPress={this.handleLessPhoto3}>
            <Text styles={{fontSize:30}} >{'-'}</Text>
        </TouchableOpacity>
                        </View>
             </View>
             <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', width:'40%'}}>
                { !photo4 ?
                        this.renderEventSkeletonRest() : (
                            
                        <Image
                        source={{ uri: photo4.src || photo4.uri}}
                        style={{width:'70%', height:'30%', borderRadius:70}}
                        />
                       
                        )
                        
                    }
                    <View style={{flexDirection:'row'}}>

         <TouchableOpacity  style={styles.logOutButtom2} onPress={this.handleChoosePhoto4}>
            <Text styles={{fontSize:30}} >{'+'}</Text>
        </TouchableOpacity> 

        <TouchableOpacity  style={[styles.logOutButtom2,{marginLeft:10}]} onPress={this.handleLessPhoto4}>
            <Text styles={{fontSize:30}} >{'-'}</Text>
        </TouchableOpacity> 

                    </View>
             </View>
             
        </View>
           



        <Pressable
             style={styles.buttonForm}
            onPress={() => this.handleStateComponend()}
          >
         
            <Text style={{textAlign:'center', alignItems:'center'}}>Confirmar Imagenes</Text>
        </Pressable>
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
      width: 150,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      paddingBottom: 0,
      paddingTop: 0,
      
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
  

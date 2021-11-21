/* eslint-disable no-shadow */
/* eslint-disable radix */
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight, Alert,   ActivityIndicator,  Image} from 'react-native'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import { isEmpty } from 'ramda';
import { capitalize } from 'lodash'
import { colors } from '../../libs/styles'
import Icon from '../../libs/CustomIcon'
import ImageIcon from '../icon'
import { errorMessage, successMessageEvent } from '../../actions/alerts'
import i18n from 'i18next';
import isempty from 'lodash'
import FastImage from 'react-native-fast-image'

import { iconType, dateToFromNowDaily, handleHitSlop } from '../../libs/helpers'
  //cards colors:
 
  

const ProductCard = (props) => {



  const {
    navigation,
    auth,
    item: {
        id,
        name,
        price,
        total_sales,
        description,
        status,
        date_created,
        images,
        weight_unit,
        dimension_unit,
        vendor_email,
        vendor_phone,
        vendor_address,
        vendor_shop_logo,
      
    }
  } = props
console.warn('IMAGESSSS->', images[0].src)
const _onLongPress =  () => {

 handleShow()
}

const [lapsus, setLapsus] = React.useState([])

const [stateDelete, setStateDelete] = React.useState([''])

const today12Hour = moment().format('YYYY-MM-DD')
const dateDAYtoday = moment().format('LT')
const _24HourLaterEvent = moment(date_created).add(24, 'hour').format('YYYY-MM-DD');


const _24HourLaterToday = moment(dateDAYtoday).add(24, 'hour').format('lll');


const diference = moment(_24HourLaterEvent).diff(today12Hour, 'hour')
//const diference2 = moment(today12Hour).diff(dateDAYevent, 'hour')

const validator = moment(date_created).isSame(moment(), 'day')

const handleRemove  = (deleteEventT, ID) => {
  console.warn('este es el ID--->',ID)
  Alert.alert(
    "xddd",
   "ffafafa",
    [
      { 
         text:  "eliminar",
         onPress:  () => ConfirmDeleteEvent(ID)
      },
   
      { text: "lasas", style: 'cancel' }
    ],
    { cancelable: false } 
  )



  // navigation.navigate('eventList', {theNewState: 'removedEvent'})
}

const ConfirmDeleteEvent = async (ID) =>{
  const {refreshList, auth, } = props
  successMessageEvent('sadsad')
 // await  deleteProduct(ID, auth)
   await refreshList()
  
}
const renderEventSkeleton = () =>{
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
 
  const ShostDate = moment(date_created).format('ddd MMM DD')
  console.log('[ESTE ES EL SHOSDATE]:', ShostDate)
  
  const day1 = moment(date_created).format('dddd').charAt(0)
  const day2 = moment(date_created).format('dddd').charAt(1)
  const day3 = moment(date_created).format('dddd').charAt(2)
  const timeText = `${day1}${day2}${day3} ${moment(date_created).format('MMM DD')}`
  
  const formatDate = date => moment(date).format('h:mm A')

  const handleShow = () => {
    const { item, onSelect } = props
    onSelect(item)
    navigation.navigate('productView', {
      id,
      productName: name,
      productDetails: item,
      images:images
    })
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={_onLongPress}
      //  onLongPress={}
        hitSlop={handleHitSlop(14)}
      > 
      <View style={{flexDirection:"row", justifyContent:"space-around", flex:1}}>
          
          <View style={{width:'50%'}} >
            {images[0].src ?
             <FastImage 
               source={{uri:images[0].src}}
                style={{ width:140, height: 140, borderRadius:20, borderWidth:1,borderColor:"black" }}

                /> : renderEventSkeleton()
                  
              }
              <Text style={{textAlign:'center', alignItems:'center', margin:6}}>{price}</Text>
          </View>     
          
          <View style={{width:'60%', borderColor:'red', alignItems:'center', justifyContent:'center', textAlign:'center', margin:10, paddingLeft:20}}>        
               <Text  style={styles.headerTitle}>{name}</Text>

              <View>
                  
                  <Text numberOfLines={4} style={{fontWeight:"500"}}>{`${description}`}</Text>
                  <View/>
                  <View style={styles.headerDate}>
                <View style={styles.eventHour}>
                    <Text style={styles.hour}>{moment(date_created).format('ll')}</Text>
                </View>
                </View>
              </View>
            </View>
          </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor:"black",
    borderWidth:1,
    backgroundColor: '#f0f0f0',
    flexDirection:'row',
    borderRadius: 20,
    height:200,
    padding:20,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center', 
    width:'97%'
  },
 
 
  
  
  headerTitle: {
    fontSize: 20,
    color: colors.purpleDark,
    fontWeight: '500',
    alignItems: 'center',
    marginBottom:22,
    textAlign:'center'

  },
  headerDate: {
    justifyContent: 'center',
    alignItems:'center',
    padding:10,
    paddingTop:20,
    textAlign:'center',
    flexDirection:"row"
  },
  headerIcon: {
    alignItems: 'center',
    padding:5
  },
  date: {
    textAlign: 'center',
    color: colors.purpleDark,
    fontSize: 14,
    fontWeight: '500'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEF3',
justifyContent:'space-around',

},
  userInfo: {
    flexBasis: '70%',
    paddingLeft:'2%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  username: {
    color: colors.purpleDark,
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 6
  },
  eventHour: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventIcon: {
    flexBasis: '35%',
    alignItems: 'flex-end'
  },
  hour: {

    textAlign: 'center',
    color: colors.purpleDark,
    fontWeight: '500',
    fontSize: 14
  }
})

function mapStateToProps (state) {
  const { auth } = state

  return {
     auth
  }
}


export default withNavigation(connect(mapStateToProps)(ProductCard))

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, StyleSheet, TouchableOpacity, Platform, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import {Image} from 'react-native'
import Icon from '../../libs/CustomIcon'
import { colors } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'
import { withNavigation } from 'react-navigation';
import headerLogoIcon from '../../imgs/NavBarSociosPorColombia.png'
import ImageIcon from '../icon'
import {
  sendMessage,
  initChatScreen,
  getGroupchannel,
  getPreviusMessages,
  receivedMessage,
  resetChatLoading,
  sbMarkAsRead,
  removeHandler,
  updatePreviusMessages
} from '../../actions';


export const BackButton = (navigation) => (
  <TouchableOpacity
    style={styles.btnContent}
    onPress={() => {
      navigation.goBack(null)
    }}
    hitSlop={handleHitSlop(14)}
  >
  <View style={{marginLeft:10}}>
   <ImageIcon 
    name={'backArrow'}
    height={30}
    width={30}
    style={{borderRadius:100}}
   />
   </View>
  </TouchableOpacity>
)

export const ResetButton = (navigation) => (
  <TouchableOpacity
    style={styles.btnContent}
    onPress={() => {
      navigation.popToTop()
      navigation.goBack(null)
    }}
    hitSlop={handleHitSlop(14)}
  >
  
      <FastImage source={require('../icon/images/box-open.png')} style={{width:400, height:400}}/>
  
   </TouchableOpacity>
)

export const RightButton = (navigation, color, name, size, screen, style) => (
  <TouchableOpacity
    style={styles.btnContent}
    onPress={() => {
      navigation.navigate(screen)
    }}
    hitSlop={handleHitSlop(14)}
  >
    <Icon color={color} style={style} name={name} size={size} />
  </TouchableOpacity>
)

export const HeaderLogo = (logo = headerLogoIcon) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '100%',
      width:"100%",
      height:70,
     //padding:50,
     //margin:30
    }}
  >
    <FastImage style={{ height: 70, width: "100%", alignSelf: 'center' }} source={logo} />
  </View>
)

const styles = StyleSheet.create({
  btnContent: {
    height: 50,
    width: 50,
    paddingTop: Platform.OS === 'ios' ? 10 : 15
  },
  icon: {
    color: colors.green,
    marginLeft: 20,
    paddingTop: 10
  }
})


function mapStateToProps(state) {
  const {
    products: { product },
    users: { currentUser },
  } = state;

  return {
    currentUser,
    product
  };
}


import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import FastImage from 'react-native-fast-image'

import Icon from '../../libs/CustomIcon'
import { colors } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'

import headerLogoIcon from '../../images/header_logo.png'

export const BackButtonGroup = (navigation) => (
  <TouchableOpacity
    style={styles.btnContent}
    onPress={() => {
      navigation.goBack(null)
    }}
    hitSlop={handleHitSlop(14)}
  >
    <Icon style={[styles.icon, { paddingTop: 4 }]} name='arrow-back' size={15} />
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
    <Icon style={[styles.icon, { paddingTop: 4 }]} name='arrow-back' size={15} />
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
      justifyContent: 'space-between',
      flexBasis: '100%'
    }}
  >
    <FastImage style={{ height: 35, width: 35, alignSelf: 'center' }} source={logo} />
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

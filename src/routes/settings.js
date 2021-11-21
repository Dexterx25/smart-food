import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'

import Settings from '../componets/settings'

import { RightButton, HeaderLogo, RightButtonChat } from '../componets/header-buttons'
import { colors } from '../libs/styles'


import headerLogoIcon from '../imgs/iracaLogo.png'

const SettingsScreen = createStackNavigator(
  {
    settings: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
      //  headerBackground: HeaderLogo(),
        headerTransparent: true,
        headerTitle:null,
        headerLeft: <View  style={{padding:0, margin:0}} />,
        headerRight: <View style={{ width: 55, opacity: 0, padding:0, margin:0}} />
      })
    }
  },
  {
    initialRouteName: 'settings'
  }
)

export default SettingsScreen

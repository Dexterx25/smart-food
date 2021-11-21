
import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation' ;   

import Settings from './settings'
//import EmptyState from  '../componets/empty-state/index'
import ProductList from './productList'
import { BackButton } from '../componets/header-buttons'
import { headerStyle, headerTitleStyle, colors } from '../libs/styles'

import MainTabBar from '../componets/main-tab-bar'
import { Image, View } from 'react-native';
import {Icon} from 'native-base'
import FastImage from 'react-native-fast-image'
import { HeaderTitle } from 'react-navigation-stack';

const icons = {
  homeFocused:require('../imgs/box-open.png'),
  home:require('../imgs/box-close.png'),
  settingsFocused:require('../imgs/user-foccus.jpeg'),
  settings:require('../imgs/user-unfo.jpeg')
}
const dashboardNavigation = createBottomTabNavigator(
  {
     productList: {
        screen: ProductList,
      
      },
       settings: {
        screen: Settings,
        navigationOptions:{
          tabBarIcon: ({tintColor, focused}) =>(
            <Image source={focused ? icons.settingsFocused : icons.settings} style={{color:tintColor, width:30, height:30}}/>
            ),
        }
     },
     
    // emptyState:{
    //   screen: EmptyState
    // }
    
  },
  {
    initialRouteName: 'productList',
  
        tabBarComponent: (props) =>( <MainTabBar {...props} /> ),
        
    
//     initialRouteName: 'productList',
//     tabBarComponent: (props)=>(
//             <MainTabBar {...props} />     
      
// )
      
    
  }
)

dashboardNavigation.navigationOptions = {
  header:null
}

export default dashboardNavigation


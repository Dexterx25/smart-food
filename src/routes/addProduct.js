
 import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import AddProduct from '../componets/add-product'
import AddProduct2 from '../componets/add-product/addProduct2'

import { RightButton, HeaderLogo, RightButtonChat, BackButton} from '../componets/header-buttons'
//import RightButtonChatC from '../components/header-buttons/buttonChat'
import { headerTitleStyle, colors, headerStyle, headerTitleStyle2} from '../libs/styles'
import AddEventForm2 from '../componets/add-product/addProductFrom2'


const prouctMainNavigator = createStackNavigator(
  {
     AddProduct: {
         screen: AddProduct,
         navigationOptions: ({ navigation }) => ({
           headerTransparent: true,
    //      headerBackground: HeaderLogo(),
           headerTitle:null,
           headerStyle: {
             backgroundColor: 'white'
            },
            headerTitleStyle2,
          
    
         })
      },
  
     

    
  },
  
  
)

export default prouctMainNavigator
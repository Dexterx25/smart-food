import React from 'react'
import { View, TouchableOpacity, Text} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import ProductList from '../componets/products'
import AddProduct from './addProduct'
import AddProduct2 from '../componets/add-product/addProduct2'
import ProductView from '../componets/products/productView'
import { RightButton, HeaderLogo, RightButtonChat, BackButton } from '../componets/header-buttons'
//import RightButtonChatC from '../components/header-buttons/buttonChat'
import { headerTitleStyle, colors, headerStyle, headerTitleStyle2} from '../libs/styles'
import { createAppContainer } from 'react-navigation';

const productListNavigatior = createStackNavigator(
  {
    ProductList: {
      screen: ProductList,
    
      navigationOptions: ({ navigation }) => ({

      //  headerBackground: HeaderLogo(),
        headerTitle:null,
        headerTransparent: true,
        headerLeft: <View   />,
        headerRight: <View style={{ width: 55, opacity: 0 }} />
       
      })
    },
   
//     productView: {
//       screen: ProductView,
//       navigationOptions: ({ navigation }) => ({
//         headerStyle,
//         headerTitle:null,
//        headerTransparent: true,
//         headerTitleStyle,
 
//       })
//   },


 
//   AddProduct2: {
//    screen: AddProduct2,
//    navigationOptions: ({ navigation }) => ({
//      headerTransparent: true,
//      headerTitle: null,
//      headerStyle: {
//        backgroundColor: 'white',
//        borderBottomWidth: 0,
//        padding:20
//      },
//      headerTitleStyle2,
//     // headerLeft: () => ( BackButton(navigation) ) 
//    })
//  },
  },
  {
    mode:'modal'
  }
)

export default productListNavigatior
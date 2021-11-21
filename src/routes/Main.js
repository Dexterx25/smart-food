import { createStackNavigator } from 'react-navigation-stack'

import Dashboard from './dashboard'
import AddEventForm2 from '../componets/add-product/addProductFrom2'
import AddEventForm3 from '../componets/add-product/addProductForm3'
import AddProduct from './addProduct'
 import ProductView from '../componets/products/productView'
 import EditProduct from '../componets/products/editProduct'
 import AddEventForm4 from '../componets/add-product/addProductFrom4'
// import AddProduct from '../componets/add-product/index'
// import AddProduct2 from '../componets/add-product/addProduct2'
 import ProductDetail from '../componets/add-product/product-detail'
 import { headerStyle, headerTitleStyle, headerTitleStyle2, colors } from '../libs/styles'
 import { BackButton } from '../componets/header-buttons'
// import { Button } from 'react-native'
// import { createAppContainer } from 'react-navigation';
const theStack =   createStackNavigator(

  {
  main: {
    screen: Dashboard
  },
  addEventForm3:{
    screen: AddEventForm3,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
       headerTitle:null,
      headerTitleStyle: {
        ...headerTitleStyle,
        color: colors.purpleDark
      }
    })
   },
   addProductFrom4:{
    screen:AddEventForm4,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
       headerTitle:null,
      headerTitleStyle: {
        ...headerTitleStyle,
        color: colors.purpleDark
      }
    })
   },
  AddEventForm2:{
    screen: AddEventForm2,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
       headerTitle:null,
      headerTitleStyle: {
        ...headerTitleStyle,
        color: colors.purpleDark
      }
    })
   },
   productDetail:{
   screen: ProductDetail,
   navigationOptions: ({ navigation }) => ({
     headerTransparent: true,
     headerTitle: null,
     tabBarVisible:false,
     headerStyle: {
       backgroundColor: 'white',
       borderBottomWidth: 0,
       padding:20
     },
     headerTitleStyle2,
    // headerLeft: () => ( BackButton(navigation) ) 
   })
 },
 editProduct:{
  screen: EditProduct,
  navigationOptions: ({ navigation }) => ({
    headerTransparent: true,
    headerTitle: null,
    tabBarVisible:false,
    headerStyle: {
      backgroundColor: 'white',
      borderBottomWidth: 0,
      padding:20
    },
    headerTitleStyle2,
   // headerLeft: () => ( BackButton(navigation) ) 
  })
},
   AddProduct: {
    screen: AddProduct,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: null,
      tabBarVisible:false,
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        padding:20
      },
      headerTitleStyle2,
     // headerLeft: () => ( BackButton(navigation) ) 
    })
  },
  productView: {
    screen: ProductView,
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerTitle: null,
      tabBarVisible:false,
      headerStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        padding:20
      },
      headerTitleStyle2,
     // headerLeft: () => ( BackButton(navigation) ) 
    })
  },
},

{
  initialRouteName:'main'
}
)
const Main =  theStack

export default Main

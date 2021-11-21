 import Main from './Main'
import Auth from './Auth'

import Loading from '../componets/loading'

import { createSwitchNavigator } from 'react-navigation'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
const routeInitial = createSwitchNavigator(
    {
      auth: {
        screen: Auth,
        path: 'auth'
      },
         main: {
          screen: Main,
          path: 'main'
         },
         loading: {
         screen: Loading
        }
    },
    {
      initialRouteName: 'loading'
    }
  )
const MainNavigator = createAppContainer(routeInitial)

export default MainNavigator

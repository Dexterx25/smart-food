import { createStackNavigator } from 'react-navigation-stack'
import React from 'react';
import {
  Text
} from 'react-native'
import { BackButton } from '../componets/header-buttons/index';
import Onboarding from '../componets/onboarding';
import SignUpForm from '../componets/onboarding/signUpForm';
 import Login from '../componets/onboarding/login';
 import ForgetPassword from '../componets/onboarding/forget-password';
 import InsertCode from '../componets/onboarding/insertCodeForm';
 import ResetPassword from '../componets/onboarding/resetPassword';
import { headerStyle } from '../libs/styles';

const Auth = createStackNavigator(
  {
    onboarding: {
      screen: Onboarding,
      navigationOptions: {
        headerMode: 'none',
        header: null
      }
    },
       login: {
         screen: Login,

         navigationOptions: ({ navigation }) => ({
            title:null,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerLeft: () => (BackButton(navigation))

          })
       },
    signUp: {
        screen: SignUpForm,
        navigationOptions: ({ navigation }) => ({
           title:null,
           title:null,
           headerStyle: {
             backgroundColor: 'white',
           },
           headerLeft: () => (BackButton(navigation))

         })
      },
   
     forgetPassword: {
       screen: ForgetPassword,
       navigationOptions: ({ navigation }) => ({
          title:null,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerLeft: () => (BackButton(navigation))

       })
     },
     insertCode: {
       screen: InsertCode,
       navigationOptions: ({ navigation }) => ({
          title:null,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerLeft: () => (BackButton(navigation))

       })
     },
     resetPassword: {
       screen: ResetPassword,
       navigationOptions: ({ navigation }) => ({
          title:null,
            headerStyle: {
              backgroundColor: 'white',
            },
            headerLeft: () => (BackButton(navigation))

       })
     }
  },
  {
    initialRouteName: 'onboarding',
    navigationOptions: {
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#ffffff',
        elevation: 0,
        height: 45,
        shadowOpacity: 0
      }
    }
  }
);

export default Auth;

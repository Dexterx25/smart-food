import axios from 'axios';
import {Alert} from 'react-native'
import { post, put, get, destroy, getResponseData, getErrorMessage, API_BASE} from '../libs/http'

import {
    AUTH_FAIL,
    AUTH_USER,
    AUTH_PASSWORD,
    AUTH_DESTROY,
    RESET_PASSWORD,
    GET_RETREIVE_DATA,
    GET_EMAIL,
    REGISTER_DEVICE,
    STORE_DEVICE,
    AUTH_SIGN_UP,
    DELETE_DEVICE,
    LOG_OUT_FACEBOOK,
    LOG_OUT_APPLE,
    FORGOT_PASSWORD,
    ADD_LOCAL_DEVICE
  } from '../constants'
  import { errorMessage, errorMessageRegister, errorMessageCustomTime, errorMessageAlert } from '../actions/alerts'

  export  function loginAuth  ({ credential, password }) {
  console.log('ESTOS SON LOS DATOS', credential, password)
  let posData = {}
  let data = null
  isNaN(credential) == false ?
  data = {
    phone_number:posData.phone_number = credential,
    password
  } : 
  data = {
    email:posData.email = credential,
    password
  }
    return{ 
   type: AUTH_USER,
   payload:fetch(`${API_BASE}:3000/api/auth/login`,
   {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
    }
   )
      .then(getResponseData)
      .catch(function(error) {
      console.log(error);
      })
      
  
     }
   }
   export function authSignUp ({ email, names, surnames, password, password_verification, phone_number, date_birtday, prefix_number, weight, height}) {
    const data =  {
       email,
       names,
       surnames,
       password,
       password_verification,
       phone_number,
       date_birtday,
       prefix_number,
       weight,
       height,
       type: 'users_email_register'
      }
      console.log('APIII-->', API_BASE)
    return{ 
   type: AUTH_USER,
   payload:fetch(`${API_BASE}:3000/api/users/register`,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
    }
   )
   .then((response) => response.json())
   .then( (response) =>{
      return new Promise((resolve, reject) =>{
          if(response.error == true){
             reject(response)
          }else if(response.error == false){
            resolve(response.body)
          }
      })
    })
   .catch((error) => {
     errorMessageAlert('error', error.body)
   })
     }
  }

  export function authSignOut (auth){
    return{
        type:AUTH_DESTROY,
        payload:auth.token
    }
  }
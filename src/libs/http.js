// @flow
import axios from 'axios';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import path from 'ramda/es/path';
import {
   BASE_URL  
 } from 'react-native-dotenv'
export const API_BASE = BASE_URL
export const getResponseData = res =>res.json().then(json => {return json});

export const getErrorMessage = (error) =>{
  return error
}


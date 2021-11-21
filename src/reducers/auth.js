import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
import jwtDecode from 'jwt-decode';
import {
  AUTH_USER,
  AUTH_PASSWORD,
  AUTH_DESTROY,
  RESET_PASSWORD,
  GET_RETREIVE_DATA,
  GET_EMAIL,
  AUTH_SIGN_UP,
  LOG_OUT_FACEBOOK,
  LOG_OUT_APPLE,
  FORGOT_PASSWORD,
  ADD_LOCAL_DEVICE
} from '../constants';

const initialState = {
  status: 'notAsked',
  token: '',
  hasEmail: false,
  provider: '',
  email: '',
  nikname:'',
  message: '',
  resetStatus: '',
  signStatus: '',
  messageForgot:'',
  localDevice:{}
};
console.log('estado inicial: ', initialState)
export default function auth(state = initialState, action) {
 
  switch (action.type) {
    case `${LOG_OUT_FACEBOOK}_${PENDING}`:
    case `${LOG_OUT_FACEBOOK}_${FULFILLED}`:
    case `${LOG_OUT_APPLE}_${PENDING}`:
    case `${LOG_OUT_APPLE}_${FULFILLED}`:
      return {
        ...state
      };
    case `${LOG_OUT_FACEBOOK}_${REJECTED}`:
    case `${LOG_OUT_APPLE}_${REJECTED}`:
      return {
        ...state,
        signStatus: 'fail'
      };
    case `${AUTH_SIGN_UP}_${PENDING}`:
      return {
        ...state,
        signStatus: 'pending'
      };
    case `${AUTH_SIGN_UP}_${FULFILLED}`:
      return {
        ...state,
        signStatus: 'success'
      };
    case `${AUTH_SIGN_UP}_${REJECTED}`:
        console.warn('THIS IS THE PAYLOAD AUTENTICATION ERROR--->', action.payload)

      return {
        ...state,
        signStatus: 'fail'
      };
    case `${AUTH_USER}_${PENDING}`:
      return {
        ...state,
        status: 'pending',
        token: '',
        hasEmail: false,
        userId: '',
        loginIdentifier:''
    
      };
    case `${AUTH_USER}_${FULFILLED}`:
      console.warn('THIS IS THE PAYLOAD AUTENTICATION--->', action.payload)
      return {
        ...state,
        status: 'success',
        token: action.payload.token,
        nikname: action.payload.store_name,
        email:action.payload.user_email,

      };
      case `${ADD_LOCAL_DEVICE}_${REJECTED}`:
         console.warn('this is the payload of LocalDevice--->', action.payload)
          return{
            ...state,
            status:'fail'

          };
      case `${ADD_LOCAL_DEVICE}_${PENDING}`:
        console.warn('this is the payload of LocalDevice--->', action.payload)
         return{
           ...state,
           status:'pending'
         };
        case `${ADD_LOCAL_DEVICE}_${FULFILLED}`:
         console.warn('this is the payload of LocalDevice--->', action.payload)
          return{
            ...state,
            status:'success',
            localDevice:action.payload
          };
    case `${AUTH_USER}_${REJECTED}`:
      return {
        ...state,
        status: 'fail',
        token: '',
        hasEmail: false,
        userId: null,
        loginIdentifier:''
      };
   
    case `${AUTH_DESTROY}`:
      return {
        status: 'success',
        token: '',
        nikname:'',
        email:''
      };
    case `${AUTH_PASSWORD}_${PENDING}`:
      return { ...state };
    case `${AUTH_PASSWORD}_${FULFILLED}`:
      return {
        ...state,
        message: action.payload.message
      };
    case `${AUTH_PASSWORD}_${REJECTED}`:
      return { ...state };
    case `${GET_RETREIVE_DATA}_${PENDING}`:
      return {
        ...state,
        message: ''
      };
    case `${GET_RETREIVE_DATA}_${FULFILLED}`:
      return {
        ...state,
        message: action.payload.message
      };
    case `${GET_RETREIVE_DATA}_${REJECTED}`:
      return {
        ...state,
        message: ''
      };
    case `${FORGOT_PASSWORD}_${PENDING}`:
      return{
        ...state,
        messageForgot:''
        }
      case `${FORGOT_PASSWORD}_${FULFILLED}`:
        return{
          ...state,
          messageForgot:action.payload.body.message
        }
        case `${FORGOT_PASSWORD}_${REJECTED}`:
      return{
        ...state,
        messageForgot:''
      }
    case `${RESET_PASSWORD}_${PENDING}`:
      return {
        ...state,
        resetStatus: 'pending',
        token: ''
      };
    case `${RESET_PASSWORD}_${FULFILLED}`:
      return {
        ...state,
        resetStatus: 'success'
      };
    case `${RESET_PASSWORD}_${REJECTED}`:
      return {
        ...state,
        resetStatus: 'fail',
        token: ''
      };
    case GET_EMAIL:
      return { ...state, email: action.payload };
    default: 
    console.log('este es el action:', action)
  console.log('este es el estado', state)
  
      return state;
  }
}

function decodeToken(token) {
  if (token) {
    console.log('este es el decodeToken de reducers: ', token)
    return [token, jwtDecode(token)];
  }
  return ['', {}];
}

// import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware';
// import { camelizeKeys } from 'humps';
// import { FETCH_USERS, FETCH_USER, STORE_DEVICE, UPDATE_USER, SEARCH_USERS_ID} from '../constants';

// const initialState = {
//   users: [],
//   currentUser: {},
//   status: 'notAsked',
//   device: '',
//   usersFetch:[]
// };

// export default function users(state = initialState, action) {
//   const { type, payload } = action;
//   switch (type) {
//     case STORE_DEVICE:
//       return {
//         ...state,
//         device: payload
//       };
//     case `${UPDATE_USER}_${PENDING}`:
//       return {
//         ...state,
//         status: 'pending'
//       };
//     case `${UPDATE_USER}_${FULFILLED}`:
//       const data  = camelizeKeys(payload.body)
//    const newData = Object.assign(state.currentUser, ...data)
         
//       return {
//         ...state,
//         status: 'success',
//         currentUser:newData
        
//       };
//     case `${UPDATE_USER}_${REJECTED}`:
//       return {
//         ...state,
//         status: 'fail'
//       };
//     case `${FETCH_USERS}_${PENDING}`:
//       return {
//         ...state,
//         users: [],
//         status: 'pending'
//       };
//     case `${FETCH_USERS}_${FULFILLED}`:
//       return {
//         ...state,
//         users: camelizeKeys(payload.body),
//         status: 'success'
//       };
//     case `${FETCH_USERS}_${REJECTED}`:
//       return {
//         ...state,
//         users: [],
//         status: 'fail'
//       };
//     case `${FETCH_USER}_${PENDING}`:
//       return {
//         ...state,
//         currentUser: {},
//         status: 'pending'
//       };
//     case `${FETCH_USER}_${FULFILLED}`:
//      console.warn('this is the payload fetchUser--->', payload)
//       return {
//         ...state,
//         currentUser: camelizeKeys(payload.body),
//         status: 'success'
//       };
//     case `${FETCH_USER}_${REJECTED}`:
//       return {
//         ...state,
//         currentUser: {},
//         status: 'fail'
//       };
//     case `${SEARCH_USERS_ID}_${PENDING}`:
//       return{
//         ...state,
//         usersFetch:[],
//         status: 'pending'
//       }
//     case `${SEARCH_USERS_ID}_${REJECTED}`:
//         return{
//           ...state,
//           usersFetch:[],
//           status: 'fail'
//         }
//     case `${SEARCH_USERS_ID}_${FULFILLED}`:
//       const {body} = payload
//       console.log('ESTE ES EL BODY -->', body)
//           return{
//             ...state,
//             usersFetch: camelizeKeys(payload.body),
//             status: 'success'
//           }
//     default:
//       return state;
//   }
// }

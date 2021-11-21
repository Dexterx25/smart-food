//import { split, last, head, compose, has, prop, ifElse } from 'ramda';
// import axios from 'axios';
// import JsonToFormData from 'json-form-data';
// import mergeDeepRight from 'ramda/es/mergeDeepRight';
// import { get, put, getResponseData, getErrorMessage, API_BASE } from '../libs/http';
// import { FETCH_USERS, FETCH_USER, UPDATE_USER, SEARCH_USERS_ID} from '../constants';
// import { BASE_URL } from '@env';
// import { isEmpty } from 'lodash';


// const baseURL: string = BASE_URL;
// const headers: Object = {
//   'Content-Type': 'multipart/form-data'
// };

// function FormRequest(method: string, url: string, axiosConfig: Object = {}): Promise<any> {
//   const options: Object = mergeDeepRight(
//     {
//       baseURL,
//       method,
//       url,
//       headers
//     },
//     axiosConfig
//   );
//   return axios(options);
// }


// export function fecthUsers() {
//   return {
//     type: FETCH_USERS,
//     payload: axios.get(`${API_BASE}/api/users/all`)
//       .then(getResponseData)
//       .catch(err => {
//         throw err;
//       })
//   };
// }
// export function fecthUsersById(data) {
//   console.log('este es el array de USERS ID', data)
//   const arrayPost = data.map(e => e.userId)
//   return {
//     type: SEARCH_USERS_ID,
//     payload: axios.post(`${API_BASE}/api/users/search`, 
//     {userId: arrayPost }
//     )
//       .then(getResponseData)
//       .catch(err => {
//         throw err;
//       })
//   };
// }
// export function fecthUser(id) {
//   return {
//     type: FETCH_USER,
//     payload: axios.get(`${API_BASE}/api/users/${id}?include=device`)
//       .then(getResponseData)
//       .catch(err => {
//         getErrorMessage(err);
//         throw err;
//       })
//   };
// }
// const generateNameFromUri = compose(
//   head,
//   split('.'),
//   last,
//   split('/')
// );

// const generateFileName = ifElse(
//   has('fileName'),
//   prop('fileName'),
//   compose(
//     generateNameFromUri,
//     prop('uri')
//   )
// );

// export function updateUserDataAvatar(currentUser, data: formData) {
//   console.warn('este es la data de UpdateUser con avatar-------->', data)
//   return {
//     type: UPDATE_USER,
//     payload: axios.put(`${API_BASE}/api/users/update`, data ,
//      { headers: { Authorization: `Bearer ${currentUser.token}` },   
//      Accept: 'application/json','Content-Type': 'multipart/form-data' }
//     )
//       .then(getResponseData)
//       .catch(err => {
//         getErrorMessage(err);
//         throw err;
//       })
//   };
// }

// export function updateUserData(currentUser, data) {
  
//   console.warn('se ejecuta el UpdateUserData con esta data--->', data)
//   console.log('ESTE ES EL FORM DATA', data  )
//   const postData ={
//     first_name:data.firstName,
//     last_name:data.lastName,
//     email:data.email,
//     language:data.language
//   }
  
//  // console.warn('{{{{{{{{{ESTE ES EL selecteData}}}}}}}}}', postData)
//   return {
//     type: UPDATE_USER,
   
//     payload: axios.put(`${API_BASE}/api/users/update`, 
//     postData,
//    { headers: { Authorization: `Bearer ${currentUser.token}` } }
    
//     )
//       .then(getResponseData)
//       .catch(err => {
//         getErrorMessage(err);
//         throw err;
//       })
//   };
// }

// export function updateUser(currentUser, data) {
//   console.log('THIS IS TE DATA [USER ACTIONS]', data)
//   return function $updateUser(dispatch) {
//     const avatarPromise =
//       data.avatar && typeof data.avatar === 'object'
//         ? ( 
//           dispatch(
            
//             updateUserDataAvatar(currentUser, transformToFormData(currentUser.userId, data))
//           )
//         )
//         : dispatch(
         
//             updateUserData(currentUser, data)
//           );
//     return Promise.all([avatarPromise]);
//   };
 
// }

// export function updateUserLanguage(currentUser, language) {
//   return {
//     type: UPDATE_USER,
//     payload: axios.put(`${API_BASE}/api/users/update`, {language:language} ,
//      { headers: { Authorization: `Bearer ${currentUser.token}` } }   
//     )
//       .then(getResponseData)
//       .catch(err => {
//         getErrorMessage(err);
//         throw err;
//       })
//   };
// }



// function transformToFormData(id, { firstName, lastName, email, avatar }) {
//    console.log('este es el firstName TRASFORMFORMDATA ', )
//    const formData = new FormData();
// //   //formData.append('data[type]', 'users');
// const name = generateFileName(avatar);
//     formData.append('first_name', firstName);
//     formData.append('last_name', lastName);
//     formData.append('email', email);
//     formData.append('file', {
     
//         uri: avatar.uri,
//         type: 'image/jpeg',
//          name
//         });

//       formData.append('id', id);
//   return formData;
//  }

//  function transformToFormDataLanguage(id, language) {
//   const formData = new FormData();
//   formData.append('language', language);
//   formData.append('id', id);
//   formData.append('avatar', '')
//   return formData;
// }
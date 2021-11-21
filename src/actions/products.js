import axios from 'axios';
import {Alert, Platform} from 'react-native'

import { DELETE_PRODUCT, FETCH_PRODUCT, UPDATE_PRODUCT_IMAGE, FETCH_PRODUCTS, SELECT_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, CREATE_PICTURES } from '../constants';
import { post, put, get, destroy, getResponseData, getErrorMessage, API_BASE} from '../libs/http'


export function fetchProducts (auth){

    return{
        type:FETCH_PRODUCTS,
        payload:axios.get(`${API_BASE}/wp-json/wcfmmp/v1/products/`,
        { headers: { Authorization: `Bearer ${auth.token}` } },

        )
        .then(getResponseData)
        .catch(getErrorMessage)
    }
}
export function fetchProduct (auth, id){
  return{
    type:FETCH_PRODUCT,
    payload:axios.get(`${API_BASE}/wp-json/wcfmmp/v1/products/${id}`,
    {headers:{ Authorization: `Bearer ${auth.token}` }}
    )
  }
}
export function createProduct (auth, body){
  console.warn('ESTOS SON LOS DATOS PARA MANDASR--->', auth, body.attributes)
    return{
      type:CREATE_PRODUCT,
      payload:axios.post(`${API_BASE}/wp-json/wcfmmp/v1/products`,body.attributes,
      { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then(getResponseData)
      .catch(getErrorMessage)
    }
}
export function sendPictures (photos){
  const type = 'CREATE_PICTURES'
  return{
    type:CREATE_PICTURES,
    payload:axios.post(`https://back.confirmapp.com/api/users/createImageIraca?type=${type}`,transfromData(photos),
    {Accept: 'application/json','Content-Type': 'multipart/form-data' }
    )
    .then(getResponseData)
    .catch(getErrorMessage)
  }
}

export function updateProduct(auth,id, values){
    return{
      type:UPDATE_PRODUCT,
      payload:axios.put(`${API_BASE}/wp-json/wcfmmp/v1/products/${id}`,values,                                                                                            
      { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then(getResponseData)
      .catch(getErrorMessage)
    }
}
export function updateImages(photos, typeUpdate){
  console.warn('PHOTOS UPDATE TO ACTION--->', photos)
  return{
    type:CREATE_PICTURES,
    payload:axios.post(`https://back.confirmapp.com/api/users/createImageIraca?type=${typeUpdate}`,transfromDataUpdate(photos),
    {Accept: 'application/json','Content-Type': 'multipart/form-data' }
    )
    .then(getResponseData)
    .catch(getErrorMessage)
  }
}
export function removeProduct(auth, id){
  return{
    type:DELETE_PRODUCT,
    payload:axios.delete(`${API_BASE}/wp-json/wcfmmp/v1/products/${id}`,
    { headers: { Authorization: `Bearer ${auth.token}` } }
    )
    .then(()=>id)
    .catch(getErrorMessage)
  }
  }


export function selectProduct (payload) {
    return {
      type: SELECT_PRODUCT,
      payload
    }
  }


  const transfromData = (photos) => {
    let data = new FormData();
    console.warn('PHOTOS IN transformData--->', photos)
    const photo = photos

    for (let i = 0; i < photo.length; i++) {
      data.append("photo", {
        name: photo[i].fileName,
        type: photo[i].type,
        uri: photo[i].uri
      });

    }
    console.warn('THIS IS THE FORM MMMMMM>---->', data)

    return data;
 
 
  };

  const transfromDataUpdate = (photos) => {
    let data = new FormData();
    console.warn('PHOTOS IN transformData--->', photos)
    const photo = photos

    for (let i = 0; i < photo.length; i++) {
      data.append("photo", {
        name: photo[i].fileName,
        type: photo[i].type,
        uri: photo[i].src
      });

    }
    console.warn('THIS IS THE FORM MMMMMM>---->', data)

    return data;
 
 
  };
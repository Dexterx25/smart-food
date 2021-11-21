/* eslint-disable no-param-reassign */
import axios from 'axios';
import { authSignOut } from '../actions';

function addTokenToAuthHeader(token, config) {
  if (token !== undefined) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export default function initializeInterceptors(store) {
  const { getState } = store;
  axios.interceptors.request.use(
    config => {
      const state = getState();
      const { token } = state.auth;

      if (token) {
        return addTokenToAuthHeader(token, config);
      }
      return config;
    },
    err => Promise.reject(err)
  );

  axios.interceptors.response.use(
    config => config,
    error => {
      if (error.response && error.response.status === 401) {
       
      }
      return Promise.reject(error);
    }
  );
}

import { combineReducers } from 'redux'
import recycleState from 'redux-recycle'
//import users from './users'
import auth from './auth'
import products from './products'

const rootReducer = recycleState(
  combineReducers({
//    users,
    auth,
    products
  }),
  ['AUTH_DESTROY_FULFILLED']
)

export default rootReducer
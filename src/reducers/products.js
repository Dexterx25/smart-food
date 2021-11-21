import { PENDING, FULFILLED, REJECTED } from 'redux-promise-middleware'
import { reverse, insert, product } from 'ramda'
import { camelizeKeys } from 'humps'
import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_PICTURES,
  REPORT_PRODUCT,
  SELECT_PRODUCT,
} from '../constants'
import { Actions } from 'react-native-gifted-chat'

const initialState = {
  status: 'notAsked',
  productStatus: 'notAsked',
  deleteStatus: 'notAsked',
  list: [],
  product: {},
  isFilter: false,
 }

export default function products (state = initialState, action) {
    switch (action.type) {
        case `${FETCH_PRODUCTS}_${PENDING}`:
        return{
            ...state,
            status: 'pending'
        
        }
        case `${FETCH_PRODUCTS}_${REJECTED}`:
            return{
                ...state,
                status: 'fail',
                list:[]
            }
        case `${DELETE_PRODUCT}_${PENDING}`:
            return{
                ...state, 
                status:'pending',
            }
         case `${DELETE_PRODUCT}_${REJECTED}`:
             return{
               ...state, 
                status:'fail',
             }
             case `${DELETE_PRODUCT}_${FULFILLED}`:
               
                return{
                    status: 'success',
                    deleteStatus:'success',
                    productStatus:'success',
                    ...state, 
                   list: state.list.filter(e => e.id !== action.payload)
                }
            case `${UPDATE_PRODUCT}_${PENDING}`:
                return{
                    ...state,
                    status:'pending'
                }
            case `${UPDATE_PRODUCT}_${REJECTED}`:
                return{
                    ...state,
                    status:'pending'
                }
            case `${UPDATE_PRODUCT}_${FULFILLED}`:
console.warn('DATA UPDATE PRODUCT FULL_FULLED_--->',action.payload)
     const dataUpdate = [action.payload].reduce(function(acc, val){
        acc["id"]=val.id,
        acc['name']=val.name,    
        acc["price"]=`$ ${val.price} pesos`,
        acc["total_sales"]=val.total_sales,
        acc["description"]=val.description.replace("<p>", "").replace("</p>\n", ""),
        acc["status"]=val.status,
        acc['featured']=val.featured
        acc['in_stock']=val.in_stock
        acc['stock_quantity'] = val.stock_quantity
        acc['manage_stock']= val.manage_stock
        acc['purchase_note']=val.purchase_note
        acc["date_created"]=val.date_created,
        acc["images"]=val.images,
        acc['weight']=val.weight,
        acc['width']=val.width
        acc['height'] = val.height
        acc['length'] = val.length
        acc['catalog_visibility']=val.catalog_visibility,
        acc['backorders']=val.backorders
        acc["weight_unit"]=val.product_units.weight_unit,
        acc["dimension_unit"]=val.product_units.dimension_unit,
        acc["vendor_email"]=val.store.vendor_email,
        acc["vendor_phone"]=val.store.vendor_phone,
        acc["vendor_address"]=val.store.vendor_address,
        acc["vendor_shop_logo"]=val.store.vendor_shop_logo
        acc["type"]=val.type
            return acc
          },{})

               return{
                     ...state,
                    status:'success',
                    list:[...state.list.filter(e => e.id !== dataUpdate.id), dataUpdate],
                    product:dataUpdate
                    }
        case `${FETCH_PRODUCTS}_${FULFILLED}`:
          console.warn('THIS IS THE LIST OF PRODUCTS_---->', action.payload)    
          const data = action.payload
          const listProduct = data.reduce(function(acc, val){
                 const obj = {
                    id:val.id,
                 name:val.name,    
                 price:`$ ${val.price} pesos`,
                 total_sales:val.total_sales,
                 description:val.description.replace("<p>", "").replace("</p>\n", ""),
                 status:val.status,
                 date_created:val.date_created,
                 weight:val.weight,
                 images:val.images,
                 weight_unit:val.product_units.weight_unit,
                 dimension_unit:val.product_units.dimension_unit,
                 vendor_email:val.store.vendor_email,
                 vendor_phone:val.store.vendor_phone,
                 vendor_address:val.store.vendor_address,
                 vendor_shop_logo:val.store.vendor_shop_logo,
                }
                acc.push(obj)
            return acc
          }, [])
          console.warn('this is the PRODUUUUUUCTSSS--->', listProduct)

        return{
                ...state,
                status: 'success',
                list:listProduct
            }
            case `${CREATE_PRODUCT}_${PENDING}`:
        return{
            ...state,
            status: 'pending'
        
        }
        case `${CREATE_PRODUCT}_${REJECTED}`:
            return{
                ...state,
                status: 'fail',
                list:[]
            }
        case `${CREATE_PICTURES}_${PENDING}`:
            return{
                ...state,
                status:'pending'
            }
            case `${CREATE_PICTURES}_${REJECTED}`:
            return{
                ...state,
                status:'fail'
            }
            case `${CREATE_PICTURES}_${FULFILLED}`:
            return{
                ...state,
                status:'success'
            }
            
        case `${CREATE_PRODUCT}_${FULFILLED}`:
          console.warn('THIS IS THE LIST OF PRODUCTS HAVE CREATED_---->', action.payload)    
          
         const theProduct = [action.payload].reduce(function(acc, val){
            const obj = {
            id:val.id,
            name:val.name,    
            price:val.price,
            weight:val.weight,
            categories:val.categories,
           // total_sales:val.total_sales,
            description:val.description.replace("<p>", "").replace("</p>\n", ""),
          //  status:val.status,
            date_created:val.date_created,
            images:val.images,
         //   weight_unit:val.product_units.weight_unit,
          //  dimension_unit:val.product_units.dimension_unit,
            vendor_email:val.store.vendor_email,
            vendor_phone:val.store.vendor_phone,
            vendor_address:val.store.vendor_address,
            vendor_shop_logo:val.store.vendor_shop_logo,
           }
           acc.push(obj)
       return acc
     }, [])
        return{
                ...state,
                status: 'success',
                list:[...state.list, ...theProduct]
            }  

     case `${FETCH_PRODUCT}_${PENDING}`:
         return{...state,status:"pending"}
     case `${FETCH_PRODUCT}_${REJECTED}`:
            return{...state,status:"fail"}
     case `${FETCH_PRODUCT}_${FULFILLED}`:
         console.warn('singleProduct-->', action.payload)
         const sigleProduct = [action.payload.data].reduce(function(acc, val){
            acc["id"]=val.id,
            acc['name']=val.name,    
            acc["price"]=val.price,
            acc["total_sales"]=val.total_sales,
            acc["description"]=val.description.replace("<p>", "").replace("</p>\n", ""),
            acc["status"]=val.status,
            acc['featured']=val.featured
            acc['in_stock']=val.in_stock
            acc['stock_quantity'] = val.stock_quantity
            acc['manage_stock']= val.manage_stock
            acc['purchase_note']=val.purchase_note
            acc["date_created"]=val.date_created,
            acc["images"]=val.images,
            acc['weight']=val.weight,
            acc['width']=val.dimensions.width
            acc['height'] = val.dimensions.height
            acc['length'] = val.dimensions.length
            acc['catalog_visibility']=val.catalog_visibility,
            acc['backorders']=val.backorders
            acc["weight_unit"]=val.product_units.weight_unit,
            acc["dimension_unit"]=val.product_units.dimension_unit,
            acc["vendor_email"]=val.store.vendor_email,
            acc["vendor_phone"]=val.store.vendor_phone,
            acc["vendor_address"]=val.store.vendor_address,
            acc["vendor_shop_logo"]=val.store.vendor_shop_logo
            acc["type"]=val.type
            acc["categories"] = val.categories[0]
            return acc
            }, {})
         return{...state,
            status:"success",
            product:sigleProduct
        }
               
        default:
            return state;
    }
}
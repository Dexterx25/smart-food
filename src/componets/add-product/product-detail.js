/* eslint-disable no-shadow */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Platform, ListViewComponent, FlatList, SectionList, ActivityIndicator
} from 'react-native';
import { take, map, capitalize, find, reduce, isNull, isEmpty } from 'lodash';
import {successMessage} from '../../actions/alerts' 
import { colors } from '../../libs/styles';
import { createProduct, sendPictures} from '../../actions';
import { handleHitSlop } from '../../libs/helpers';
import ButtonField from '../../componets/button';
import { T } from 'ramda';

class productDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
     usersRender: [],
     refreshing:false
      };
  }


  componentWillReceiveProps(nextProps) {
    const { status } = nextProps;
    if (status === 'success') {
      setTimeout(() => {
        nextProps.navigation.navigate('eventSuccess');
      }, 700);
    }
  }
  componentDidMount = async () =>{
    const {fecthUsersById, usersFetch, navigation} = this.props
    const paramm = navigation.getParam('values')
    const paramm2 = navigation.getParam('photos')

    console.warn('THIS IS THE INVITATIONSLIST ADD PRODUCT DiDMoUnT Final-->', paramm, paramm2)
      try{

  }catch(e){
        console.log('este es el', e)
      }
  }
  refreshList = async () => {
    try {
      this.setState({refreshing: true})
    } catch (e) {
  console.warn('Event Error', e)
      //console.warn('Ocurrio un error al traer los eventos ', e)
    }
    this.setState({refreshing: false})
  }
  renderEventSkeleton() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  keyExtractor = item => item.fileName

  handleCreateProduct =  async (values, photos)=> {
    const { createProduct, navigation, auth, sendPictures} = this.props;
    const {catalog_visibility, category, description, type, price, productName, etiquetas, weight, length, height, width, stock_quantity} = values
    const theCategoryParsing =!category ? '' : JSON.parse(category).id

    
    
     const theType = !type ? ''  : JSON.parse(type).id
 
    const theStateCatalog = !catalog_visibility  ? '' :  JSON.parse(catalog_visibility).id
    const cat = theCategoryParsing == '' ? '' : parseInt(theCategoryParsing)
try {
  //console.warn('DATAS BODY TO SUBMIT----->', body)
  console.warn('THIS IS THE PHOTOSSSSS--->', photos)
if(!photos.length){
  let body = {}

  body['attributes'] = {
    name: productName,
    stock_quantity,
    type:theType,
     length,
     height,
     width,    
    price:parseInt(price),
    description,
    weight,
    catalog_visibility:theStateCatalog,
    regular_price:parseInt(price),
    categories:[cat],
    manage_stock:true
    }


await  createProduct(auth, body) 
.then((respon)=>{
console.warn('THIS IS THE RESPON--->', respon)
successMessage('Bien Hecho', 'Producto creado Correctamente')
 navigation.navigate('productList')
})
}else{
 await sendPictures(photos).then(async(RES) =>{
   console.warn('THIS IS THE RESSSSSSS--->', RES.value.url)
 console.warn('FEATURED IMAGE FROM BACKEND-->', RES.value.urlfetured )
   
 let body = {}

    body['attributes'] = {
      name: productName,
      stock_quantity,
      type:theType,
       length,
       height,
       width,
      featured_image:{"src":RES.value.urlfetured},
      gallery_images:RES.value.url,
      price:price.slice(1)*1000,
      description,
      weight,
      catalog_visibility:theStateCatalog,
      regular_price:price.slice(1)*1000,
      categories:[cat],
      manage_stock:true
      }


 await  createProduct(auth, body) 
 .then((respon)=>{
console.warn('THIS IS THE RESPON--->', respon)
  successMessage('Bien Hecho', 'Producto creado Correctamente')
   navigation.navigate('productList')
})
 
   })
  }
    
} catch (error) {
console.warn('this is the error--->', error)  
}
  }

  

  render() {
    const { t, navigation, status } = this.props;
    const params = navigation.getParam('values');
    const params2 = navigation.getParam('photos')
    let PhotosArray = []

const dataFotosSubmit = params2.filter(e => e !== null)
PhotosArray.push(...params2)


console.warn('THE ARRAY PHOTOSS--->', PhotosArray.filter(e => e !== null))
const arrayDestruct = PhotosArray.filter(e => e !== null).reduce((acc, item)=>{
      acc.push(item)
  return acc
},[])
console.warn('arry--->', arrayDestruct)
    console.warn('THIS IS THE PARAMMMMS--->', params, params2)
    console.warn('PRICEEEE PARAMSSS--->', params.price.slice(1))
    return (
      <View style={styles.container}>
        <View style={{paddingTop:60, marginBottom:10}}>
                  <Text style={{alignItems:'center', textAlign:'center', color:colors.greyLight, fontWeight:'700', fontSize:20, paddingBottom:20}}>{'Detalles del producto'}</Text>
      </View>

        <ScrollView>
          <View style={styles.formContent}>
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Nombre de producto:'}</Text>
              <Text style={styles.detailText}>{params.productName}</Text>
            </View>
           
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Precio:'}</Text>
              <Text style={styles.detailText}>{`${params.price}`}</Text>
            </View>

            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Description:'}</Text>
              <Text style={styles.detailText}>{params.description}</Text>
            </View>

            {/* <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Etiquetas'}</Text>
              <Text style={styles.detailText}>{params.etiquetas}</Text>
            </View> */}
            {params.stock_quantity ?
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Cantidad en inventario:'}</Text>
              <Text style={styles.detailText}>{`${params.stock_quantity}`}</Text>
            </View> : null
            }
          {params.weight ?
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Peso del producto:'}</Text>
              <Text style={styles.detailText}>{`${params.weight} kg`}</Text>
            </View> : null
          }
          { params.width ?
          <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Ancho del producto:'}</Text>
              <Text style={styles.detailText}>{`${params.width} cm`}</Text>
          </View> : null
            }
          { params.height ?
          <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Alto del producto:'}</Text>
              <Text style={styles.detailText}>{`${params.height} cm`}</Text>
            </View> : null
            }
             { params.length ?
          <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Largo del producto:'}</Text>
              <Text style={styles.detailText}>{`${params.length} cm`}</Text>
            </View> : null
            }
           {params.catalog_visibility ? <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Estado En catalogo:'}</Text>
              <Text style={styles.detailText}>{JSON.parse(params.catalog_visibility).name}</Text>
            </View> : null}

            {params.type ?<View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Tipo:'}</Text>
              <Text style={styles.detailText}>{JSON.parse(params.type).name}</Text>
            </View> : null}

           {params.category ? <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Categoria:'}</Text>
              <Text style={styles.detailText}>{JSON.parse(params.category).name}</Text>
              
              </View> 
              : null}
            <View>
            <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>{'Fotos:'}</Text>
         {arrayDestruct.length ? 
         <View style={{width:'100%', height:'50%',alignItems:'flex-start', flexDirection:'row'}}>
         {arrayDestruct.map( e =>
          <View key={e.fileName} style={ { paddingHorizontal: 10 }}>
           <Image
              source={{ uri: e.uri }}
              style={{width:70, height:50, borderRadius:100}}
            />
     
        </View>)}
      
          </View> 
          : <View>
            <Text style={styles.detailText}>{'Sin Fotos'}</Text>
            </View>}
          </View>
         
            </View>
          </View>
           
         
        </ScrollView>
       
        <View style={{flexDirection:'row-reverse'}}>
       {this.props.status == 'success' ?   
          <TouchableOpacity
                            style={styles.logOutButtom}

            onPress={ () => this.handleCreateProduct(params, dataFotosSubmit)}>
<Text style={styles.logOutLabel}>{'Agregar'}</Text>            
            
           </TouchableOpacity> : this.renderEventSkeleton() }
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dac292',
    justifyContent: 'flex-start',
    position: 'relative',
    paddingTop:60,
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 30
  },
  formContent: {
    marginTop: 40
  },
  iconDate: {
    marginLeft: 10
  },
  detailContent: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginBottom: 40,
    flexDirection: 'column'
  },
  imageContent: {
    marginLeft: 20,
    flexDirection: 'row'
  },
  detailTitle: {
    color: colors.greyLight,
    fontSize: 17,
    fontWeight:'400',
    marginBottom: 10,
    marginLeft: 20
  },
  detailText: {
    color: colors.purpleDark,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20
  },
  userImageList: {
    width: 31,
    height: 31,
    marginRight: 3,
    borderRadius: 15
  },
  logOutButtom: {
    marginBottom: 60,
    width: 150,
    height: 45,
    backgroundColor:"#ffe3b8",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10
  },
  logOutLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
});

function mapStateToProps(state) {
  const {
    products: { status,product, listAll}, 
    auth
   } = state;
  return {
    status,
    auth,
    product,
  };
}
export default connect(
  mapStateToProps,
  { createProduct, sendPictures}
)(productDetail)
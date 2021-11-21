/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withNavigation } from 'react-navigation';
import {Header} from 'react-navigation-stack'
import { isEmpty, take, drop } from 'lodash';
import FastImage from 'react-native-fast-image';
import { errorMessage, successMessageEvent } from '../../actions/alerts'
import moment from 'moment'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  ScrollView,
  Platform,
  RefreshControl, 
  Image,
  StatusBar, 
  Alert
} from 'react-native';
import i18n from 'i18next';
const greenGroupIcon = require("../icon/images/green-group-icon.png");
import {successMessage} from '../../actions/alerts'
import { fetchProduct, removeProduct, fetchProducts } from '../../actions';
import { colors, buttonText2, buttonBlur, buttonPrimary } from '../../libs/styles';
import { handleHitSlop } from '../../libs/helpers';
import Icon from '../../libs/CustomIcon';
import Background from '../background';
import { iconType } from '../../libs/helpers';
import { isIphoneX } from 'react-native-iphone-x-helper';
import * as Animatable from 'react-native-animatable';
import ImageIcon from '../icon'
import LoadScreen from '../onboarding/loadScreen'
class ProductView extends Component {
 

  state = {
    id: null,
    showModal: false,
    showUserModal: false,
    active: false,
    refreshing: false,
    
  };

  componentDidMount = async () => {
    const { navigation,auth, fetchProduct,productStatus} = this.props;
    console.warn('THIS IS THE PRODUCT STATUS--->', productStatus)
    const id = navigation.getParam('id')
    await fetchProduct(auth, id)
    this.setState({ id })

    

    try {
      await fetchProduct(auth, id)
      this.setState({ refreshing: false })
    } catch (err) {
      console.warn('Error al cargar el evento', err)
      this.setState({ refreshing: false })

    }
  }
  



  onRefresh = async () => {
    const { fetchProduct, auth } = this.props
    const { id } = this.state
    this.setState({ refreshing: true })
    try {
      await fetchProduct(auth, id)
    } catch (err) {
      this.setState({ refreshing: false })
    }
  }

  showModal = visible => {
    this.setState({ showModal: visible });
  };
  showUserModal = visible => {
    this.setState({ showUserModal: visible });
  };

 
  


  ConfirmDeleteProduct  = async () => {
    const {id} = this.state
    const {navigation, auth, removeProduct, fet} = this.props
       await removeProduct(auth, id) 
        successMessage("Muy bien", "Producto eliminado correctamente")

     navigation.navigate('loading')
   await  fetchProducts(auth)
    }


  handleDelete =  () => {
  
  Alert.alert(
    "Eliminar producto?",
    "Si eliminas este producto no volverás a verlo más",
    [
      {
        text: "Eliminar",
        onPress: () => this.ConfirmDeleteProduct()
      },
      { text: "Cancelar", style: 'cancel' }
    ],
    { cancelable: false } 
  )
  }



  renderEventSkeleton() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%', height:'100%'}}>

<LoadScreen />
      </View>
    );
  }



  renderProductView() {
    const { refreshing } = this.state
    const { navigation, product } = this.props;
    console.warn('THE PRODUCTTTT--->', product)
    const images = this.props.navigation.getParam('images')
    return (
      <Animatable.View animation={'fadeIn'} duration={200} delay={300}>
        <View style={{flexBasis: '100%'}}>
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingTop: Header.HEIGHT * (1.0) }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() =>this.onRefresh()}
                tintColor="#dadada"
              />
            }
          >
          
          <View style={[{ alignItems:'center', width:'100%', justifyContent:'center', borderColor:'red'}, images.length > 1 ?{flexDirection:'row'} : null]}>
            <ScrollView 
        horizontal={true}    
        contentContainerStyle={{ paddingRight: 14 }}
  
      style={{alignContent:'center',
      //backgroundColor:"#ffe3b8",
      borderRadius:20,
    marginHorizontal: 20
    
    }}>
          {images.map(e =>
          <View>
          {!e.src ? this.renderEventSkeleton() :  
          <Image  source={{uri:e.src}} style={{width:200,height:200, borderRadius:50, flexDirection:'row'}}/>}
          </View>
          )
          }
          </ScrollView>
          </View>


          
<View style={{padding:30}}>
            <View style={{alignItems:'center', textAling:'center', padding:20, justifyContent:'center'}}>
              <Text numberOfLines={3} style={styles.title}>
              {product.name}
              </Text>
            </View>         
            <View style={{ flexDirection:"row", paddingRight:5, paddingTop:10 }}>
                         
                  <ImageIcon
                      name='priceicon'
                      height={20}
                      width={20}
                      style={{borerColor:'red'}}
                  />
              <Text style={{ color: 'black', paddingLeft:20 }}>
                {`$ ${product.price}`}
              </Text>
            </View>
            
              <View style={{ flexDirection:"row", paddingRight:5, paddingTop:10}}>
              <ImageIcon
                      name='dateIcon'
                      height={20}
                      width={20}
                  />
                <Text style={{paddingLeft:20}}>{`${moment(product.date_created).format('llll')}`}</Text>
              </View>
            
              
            
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10}}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Tipo:"}</Text>
                <Text>{product.type}</Text>
              </View>
              
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Categoria:"}</Text>
            <Text>{!product.categories ? this.renderEventSkeleton() : product.categories.name}</Text>
              </View>
              {product.stock_quantity ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Cantidad en Inventario:"}</Text>
            <Text>{!product.stock_quantity ? this.renderEventSkeleton() : `${product.stock_quantity}`}</Text>
              </View> : null
              }
              {product.status ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Estado en Tienda:"}</Text>
            <Text>{!product.status ? this.renderEventSkeleton() : `${product.status}`}</Text>
              </View> : null
              }
              
             {product.weight ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Peso:"}</Text>
            <Text>{!product.weight ? this.renderEventSkeleton() : `${product.weight} kg`}</Text>
              </View> : null
              }
              {product.width ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Ancho:"}</Text>
            <Text>{!product.width ? this.renderEventSkeleton() : `${product.width} cm`}</Text>
              </View> : null
              }
              {product.height ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Alto:"}</Text>
            <Text>{!product.height ? this.renderEventSkeleton() : `${product.height} cm`}</Text>
              </View> : null
              }
              
              {product.length ?
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Largo:"}</Text>
            <Text>{!product.length ? this.renderEventSkeleton() : `${product.length} cm`}</Text>
              </View> : null
              }
              <View style={{ flexDirection:"column", paddingRight:5, paddingTop:10 }}>
            <Text style={{color:'white',fontSize:16, paddingRight:5}}>{"Estado en catalogo:"}</Text>
            <Text>{!product.catalog_visibility ? this.renderEventSkeleton() : product.catalog_visibility}</Text>
              </View>
              <View style={{flexDirection:"column", paddingRight:5, paddingTop:10}}>
            <Text style={{color:'white', fontSize:16}}>{'Direccion de Vendedor:'}</Text>
            <Text>{product.vendor_address}</Text>
              </View>
              
              <View style={{flexDirection:"column", paddingRight:5, paddingTop:10}}>
            <Text style={{color:'white', fontSize:16}}>{'Descripción:'}</Text>
            <Text>{product.description}</Text>
              </View>
           
              <View style={{ marginTop: 40, alignItems:'center', justifyContent:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity
                      color={'black'}
                      onPress={() => navigation.navigate('editProduct', { productDetails: product, images:images })}
                      underlayColor={'black'}
                      hitSlop={handleHitSlop(14)}
                    >
                      <ImageIcon
                      name='edigIcon'
                      height={60}
                      width={60}
                      style={{borderRadius:10}}
                  />
                    </TouchableOpacity>
                       <View style={{paddingLeft:40}}>
                        <TouchableOpacity
                          color={'black'}
                          onPress={this.handleDelete}
                          underlayColor={'black'}
                          hitSlop={handleHitSlop(14)}
                        >
                <ImageIcon
                      name='removeIcon'
                      height={60}
                      width={60}
                      style={{borderRadius:10}}
                  />
                        </TouchableOpacity>
                    </View> 
                </View>
</View>         
              </View>
          </ScrollView>
        </View>
      </Animatable.View>
    );
  }

  render() {
    console.warn('THIS IS THE STATUS-->', this.props.status)
    return (
      <View style={styles.container}>
        { this.props.status == 'pending' ? this.renderEventSkeleton() : this.props.status == 'success' && this.renderProductView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dac292"
  },
  buttonContact: {
    backgroundColor:'blue',
    width: 95,
    height: 39,
    alignItems: 'center',
    paddingBottom: 0,
    borderRadius:12,
    paddingTop: 8
  },
  buttonContact2: {
  backgroundColor:'red',
    width: 95,
    height: 39,
    borderRadius:12,
    alignItems: 'center',
    paddingBottom: 0,
    color:'red',
    paddingTop: 8
  },
  userImageList: {
    width: 31,
    height: 31,
    marginRight: 3,
    borderRadius: 15,
    backgroundColor: '#202441'
  },
  text: {
    color: '#ffffff',
    fontSize: 20
  },
  title: {
    fontSize: 32,
    color: 'black',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    fontWeight: '500',
    width: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  headerText: {
    color: '#cdcbcb',
    fontSize: 14
  },
  headerTitle: {
    fontSize: 17,
    color: colors.purpleDark,
    fontWeight: '300',
    height: 40
  },
  containerGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  contentGroup:{
    flexBasis: '50%',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'rgb(224, 253, 246)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 6
  },
  textGroup: {
    color: '#B3B3B3',
    fontSize: 15,
    fontWeight: '600',
    paddingLeft: 8
  }
});

function mapStateToProps(state) {
  const {
    products: { product, status },
    auth
  } = state;

  return {
    product,
    status,
    auth,
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    {
      fetchProduct,
      removeProduct,
      fetchProducts
    }
  )(ProductView)
);
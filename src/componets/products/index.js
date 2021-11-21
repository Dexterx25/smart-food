/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  SectionList,
  ActivityIndicator,
  Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { isEmpty, orderBy, set } from 'lodash';
 import moment from 'moment';
 import * as Animatable from 'react-native-animatable';
 import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from './TabBar'
 import { errorMessage } from '../../actions/alerts'
import ProductCard from './ProductCard'
  import { colors, buttonBlur } from '../../libs/styles';
  import { handleHitSlop } from '../../libs/helpers';
import {
  fetchProducts,
  //deleteProduct
  authSignOut,
  selectProduct
} from '../../actions';
//import Background from '../background';
import EmptyImage from '../../componets/icon/images/EmpatyState.png'
import EmptyState from './EmptyState'
import SectionItem from './SectionItem'
import Background from '../background';
import imageBackground from '../../imgs/backGroundPhone.png'
class ProductList extends Component {
  state = {
    tab1: true,
    tab2: false,
    refreshing: false,
    events: [],
    stateRemove: ''
  };

  componentDidMount = async () => {
   const {products, navigation} = this.props
    try {
      await this.updateProducts()

    } catch (e) {
      console.warn('ESTE ES EL ERROR _-->',e )

    }
  }



  updateFresh = () =>{
    try{
      this.setState({refreshList:true})
      this.refreshList()
    }catch(e){
      console.warn(e)
    }
    this.setState({refreshList:false})
   
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    const {
      events,
      userId,
       registerDevice,
      playerId,
      auth,
      updateUserLanguage,
      startDate
    } = this.props

    if (prevProps.events !== events) {
      this.setState({ events })
    }

   
  }
  
  refreshList = async () => {
    try {
      this.setState({refreshing: true})
       this.updateProducts()
    } catch (e) {
  console.warn('Event Error', e)
      //console.warn('Ocurrio un error al traer los eventos ', e)
    }
    this.setState({refreshing: false})
  }

  updateProducts = async () => {
  
      const {
        fetchProducts,
        auth,
        navigation,
        authSignOut
      } = this.props;   
      try {
  //  const responFetch = await  fetchProducts(auth)
    //    console.warn('ResponQuery-->', responFetch)
    console.log('FETCH SHOPLIST')
      } catch (error) {
        await authSignOut(auth)
        navigation.navigate('auth')

          console.warn('THIS IS THE ERROR--->', error)
      }
  }

  handleEventList = (item, isTab2) => {

    const { selectEvent, auth } = this.props
    return (
      <Animatable.View
        animation={isTab2 ? 'fadeInLeft' : 'fadeInRight'}
        duration={650}
      >
        <ProductCard refreshList={this.refreshList}   auth={auth} onSelect={selectProduct} item={item}  stateRefresh={this.state.refreshing} stateRemove={this.state.stateRemove} />
      </Animatable.View>
    )
  }
 
 
  renderSection = ({ section, index }) => {
    
    const { tab1 } = this.state
    if(index === 0) {
      return (
        <SectionItem
          title={section.name}
          data={section.data}
          renderItem={(item) => this.handleEventList(item, tab1)}
        />
      )
    }
    return null
  }
  handleTabBar = i => {
    if (!i) return this.handleFilterByActived()
    this.handleFilterByAccepted()
  }
  handleFilterByActived() {
    this.setState({ tab1: true, tab2: false });
  }

  handleFilterByAccepted() {
    this.setState({ tab1: false, tab2: true });
  }

  renderEventSkeleton() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:100 }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }


  renderProductList() {
  
    
    const {tab1 } = this.state
    const {products, navigation} = this.props
   
    console.warn('PRODUCTOS RENDERLIST_----->', products)
    const catStartDates = products.map(e => e.date_reated)
    const { status } = this.props;
    let productList = []
    const orderProducts = orderBy(products, e => new Date(e.date_created), ['asc']);
    if (status === 'pending' && this.state.refreshing === false) {
      return (
        <View style={{ justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      );
    }
    const today = moment().format('YYYY-MM-DD')
   
  
    const arrayProducts = orderProducts.map(i => i)
 
      if(tab1){
        if (arrayProducts.length) {
            productList.push({ title: ('Mis productos'), data: arrayProducts})
        }
    }
    console.warn('THIS IS THE PRODUCTLIST____>', ProductList)
    return (
      <View>
      <SectionList
        sections={ productList }
        style={{ paddingTop: 10, height:'100%', paddingBottom: Platform.OS === 'ios' ? 120 : 200 }}
        keyExtractor={(item, index) => item + index}
        renderItem={(data) => this.renderSection(data) }
        refreshing={this.state.refreshing}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<EmptyState />}
        onRefresh={() => this.refreshList()}
      /> 
      </View>
    );
  }

  render() {
    const { offline: { online } } = this.props;
 
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#dac292" }}>
        <Background imageBackground={imageBackground} />
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          { online ? (
            <View style={{paddingTop:40}} >
              { this.props.status == 'pending' ? this.renderEventSkeleton() : this.renderProductList() }
            </View>
          ) : (
<View>
    <Text>'Fuera de Connección'</Text>
</View>
)}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexBasis: '100%'
  },
  tabButton: {
    flexDirection: 'row',
    paddingBottom: 10,
    borderRadius: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabText: {
    flexBasis: '100%',
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 16
  }
});

function mapStateToProps(state) {
  const {
    products: { list, status, productStatus },
    auth,
    offline
  } = state;

  return {
    products: list,
    status,
    productStatus,
    auth,
    offline,
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    {
        fetchProducts,
      //  deleteProduct
      authSignOut,
      selectProduct
    }
  )(ProductList)
);
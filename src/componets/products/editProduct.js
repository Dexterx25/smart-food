/* eslint-disable no-confusing-arrow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys } from 'humps';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Picker,
  Platform,
  StatusBar,
  Modal,
  ActivityIndicator,
  Pressable
} from 'react-native';
import i18n from 'i18next'
import { composeInitialProps, withTranslation } from 'react-i18next';
import { withFormik } from 'formik';
import { capitalize, isEmpty, map, take, unionBy, filter } from 'lodash';
import 'moment/locale/es';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors } from '../../libs/styles';
import {
  categoryEdit,
  categoryType,
  handleHitSlop,
  handleMaxCharacters
} from '../../libs/helpers';
import Icon from '../../libs/CustomIcon';
import {
    updateProduct,
    updateImages
} from '../../actions';
import PhotosEdit from './editPhotos'
import {utilFormating, utilsFormatingWithImage} from './utilsTypes'
import ButtonField from '../../componets/button';
import { successMessage, errorMessage} from '../../actions/alerts';
import { extructuringVisibility, extructuringType, extructuFeatured, extructurState, extructureInStock,extructureBackordersState, extructureMangeStock} from './utilsProduct'
const MAX_NAME_EVENT = 44
const handleMaxEventName = handleMaxCharacters(MAX_NAME_EVENT)
import { TextInputMask } from 'react-native-masked-text'

class EditEvent extends Component {
state={
    tapedCategory:false,
    tapedType:false,
    tapedVisibility:false,
    type:{},
    categories:{},
    featured:'',
    state:'',
    in_stock:'',
    manage_stock:'',
    backorders:'',
    photo: null,
    photo2:null,
    photo3:null,
    photo4:null,
    photosEditState:false,
    imagesAlter:[]
}
  androidSetType(type) {
    console.warn('THIS IS THE NEW TYPE--->', JSON.parse(type))
    const { values } = this.props;
    values.type = JSON.parse(type);
    this.setState({ type });
  }
 
  androidSelectType() {
    const colorText = isEmpty(this.state.type) ? colors.purpleDark : colors.purpleDark;
    const {values} = this.props
    return (
       <View>
        <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.type}
          onValueChange={item => this.androidSetType(item)}
         >
          <Picker.Item label={extructuringType(values.type)} value={JSON.stringify({id:values.type})} />
          <Picker.Item label={('Simple')} value={JSON.stringify({id:'simple', name:"Simple"})} />
          <Picker.Item label={('Externo')} value={JSON.stringify({id:'external', name:"Externo"})} />
    </Picker>
      </View>
    );
  }
  androidSetCategory(categories) {
      console.warn('CATEGORIES ANDROIDSET--->', categories)
    const { values } = this.props;
    values.categories = JSON.parse(categories);
    this.setState({ categories });
  }
  androidSetCatalogVisibility(catalog_visibility) {
    console.warn('CATALOG VISIBILITYYYYY-------->', JSON.parse(catalog_visibility))
    const { values } = this.props;
    values.catalog_visibility = JSON.parse(catalog_visibility);
    this.setState({ catalog_visibility });
  }
  androidSelectCatalogVisibility() {
    const {values} = this.props
    const colorText = isEmpty(this.state.catalog_visibility) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.catalog_isibility}
          onValueChange={item => this.androidSetCatalogVisibility(item)}
        >
          <Picker.Item label={(extructuringVisibility(values.catalog_visibility))} value={JSON.stringify({id:values.catalog_visibility, name:extructuringVisibility(values.catalog_visibility)})} />
          <Picker.Item label={('Visible')} value={JSON.stringify({id:'visible',name:"Visible"})} />
          <Picker.Item label={('En catalogo')} value={JSON.stringify({id:'catalog', name:"En catalogo"})} />
          <Picker.Item label={('Oculto')} value={JSON.stringify({id:'hidden', name:'Oculto'})} />
          <Picker.Item label={('Solo en los resultados de busqueda')} value={JSON.stringify({id:'search', name:"Solo en los resultados de busqueda"})} />
    </Picker>
      </View>
    );
  }
  androidSetFeatuered(featured){
      const {values} = this.props
      values.featured = featured;
      this.setState({ featured });
  }
  androidSelectfeatured(){
    const {values} = this.props
    const colorText = isEmpty(this.state.featured) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.featured}
          onValueChange={item => this.androidSetFeatuered(item)}
        >
          <Picker.Item label={(extructuFeatured(values.featured))} value={values.featured} />
          <Picker.Item label={('Destacado')} value={true} />
          <Picker.Item label={('No destacado')} value={false} />
       </Picker>
      </View>
    );
  }

  androidSetState(status){
    const {values} = this.props
    values.status = status;
    this.setState({ status });
  }

  
  androidSelectState(){
    const {values} = this.props
    const colorText = isEmpty(this.state.status) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.status}
          onValueChange={item => this.androidSetState(item)}
        >
          <Picker.Item label={(extructurState(values.status))} value={values.status} />
          <Picker.Item label={('Publicado')} value={'publish'} />
          <Picker.Item label={('Borrador')} value={'draft'} />
          <Picker.Item label={('Pendiente')} value={'pending'} />

       </Picker>
      </View>
    );  
  }
  androidSetInstore(in_stock){
    const {values} = this.props
    values.in_stock = in_stock;
    this.setState({ in_stock });
  }
  androidSelectInStore(){
    const {values} = this.props
    const colorText = isEmpty(this.state.in_stock) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.in_stock}
          onValueChange={item => this.androidSetInstore(item)}
        >
          <Picker.Item label={(extructureInStock(values.in_stock))} value={values.in_stock} />
          <Picker.Item label={('En Stock')} value={true} />
          <Picker.Item label={('Fuera de Stock')} value={false} />
       </Picker>
      </View>
    ); 
  }
  androidSetManegeStock(manage_stock){
    const {values} = this.props
    values.manage_stock = manage_stock;
    this.setState({ manage_stock });    
  }
  androidSelectStockManege(){
    const {values} = this.props
    const colorText = isEmpty(this.state.manage_stock) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.manage_stock}
          onValueChange={item => this.androidSetManegeStock(item)}
        >
          <Picker.Item label={(extructureMangeStock(values.manage_stock))} value={values.manage_stock} />
          <Picker.Item label={('Manejar Inventario')} value={true} />
          <Picker.Item label={('No manejar Inventario')} value={false} />
       </Picker>
      </View>
    ); 
  }
  backordersState(){
    const {values} = this.props
    const colorText = isEmpty(this.state.backorders) ? colors.purpleDark : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.backorders}
          onValueChange={item => this.androidSetManegeStock(item)}
        >
          <Picker.Item label={(extructureBackordersState(values.backorders))} value={values.backorders} />
          <Picker.Item label={('Permitir')} value={'yes'} />
          <Picker.Item label={('No Permitir')} value={'no'} />
          <Picker.Item label={('Permitir pero notificar al cliente')} value={'notify'} />
       </Picker>
      </View>
    ); 
  }
  androidSelectCategory() {
    const colorText = isEmpty(this.state.categories) ? colors.purpleDark : colors.purpleDark;
    const {values} = this.props
    return (
      <View>
        <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.categories}
          onValueChange={item => this.androidSetCategory(item)}
        >
          <Picker.Item label={(`${values.categories.name}`)} value={JSON.stringify({id:values.categories.id, name:values.categories.name})} />
          <Picker.Item label={('Experiencias')} value={JSON.stringify({id:164, name:'Experiencias'})} />
          <Picker.Item label={('Etnoeducación')} value={JSON.stringify({id:168, name:'Etnoeducación'})} />
          <Picker.Item label={('Etnoturismo')} value={JSON.stringify({id:167, name:'Etnoeducación'})} />
          <Picker.Item label={('Medicina Tradicional')} value={JSON.stringify({id:190, name:'Medicina Tradicional'})} />
          <Picker.Item label={('Restaurantes')} value={JSON.stringify({id:191,name:"Restaurantes"})} />
          <Picker.Item label={('Rituales')} value={JSON.stringify({id:170, name:"Restaurantes"})} />
          <Picker.Item label={('Turismo')} value={JSON.stringify({id:169, name:"Turismo"})} />
          <Picker.Item label={('Otros')} value={JSON.stringify({id:192,name:"Otros"})} />
          <Picker.Item label={('Semillas y prácticas ancestrales')} value={JSON.stringify({id:237, name:"Semillas y prácticas ancestrales"})} />
          <Picker.Item label={('Productos Frescos')} value={JSON.stringify({id:165, name:"Productos Frescos"})} />
          <Picker.Item label={('Aromaticas')} value={JSON.stringify({id:187, name:"Aromaticas"})} />
          <Picker.Item label={('Carnes')} value={JSON.stringify({id:254, name:"Carnes"})} />
          <Picker.Item label={('Cereales')} value={JSON.stringify({id:238, name:"Cereales"})} />
          <Picker.Item label={('Cereales y granos')} value={JSON.stringify({id:253, name:"Cereales y granos"})} />
          <Picker.Item label={('Derivados Lacteos')} value={JSON.stringify({id:188, name:"Derivados Lacteos"})} />
          <Picker.Item label={('Frutas')} value={JSON.stringify({id:183, name:"Frutas"})} />
          <Picker.Item label={('Hierbas Medicinales')} value={JSON.stringify({id:185, name:"Hierbas Medicinales"})} />
          <Picker.Item label={('Hortalizas')} value={JSON.stringify({id:184, name:"Hortalizas"})} />
          <Picker.Item label={('Pescado y Mariscos')} value={JSON.stringify({id:189, name:"Pescado y Mariscos"})} />
          <Picker.Item label={('Tubérculos')} value={JSON.stringify({id:186, name:"Tubérculos"})} />
          <Picker.Item label={('Productos Terminados')} value={JSON.stringify({id:166, name:"Productos Terminados"})} />
          <Picker.Item label={('Gastronomía')} value={JSON.stringify({id:171, name:"Gastronomía"})} />
          <Picker.Item label={('Condimentos y especies')} value={JSON.stringify({id:172, name:"Condimentos y especies"})} />
          <Picker.Item label={('Conservas')} value={JSON.stringify({id:174, name:"Conservas"})} />
          <Picker.Item label={('Textiles y Artesanias')} value={JSON.stringify({id:175, name:"Textiles y Artesanias"})} />
          <Picker.Item label={('Escultura')} value={JSON.stringify({id:181, name:"Escultura"})} />
          <Picker.Item label={('Fotografia y Pintura')} value={JSON.stringify({id:180, name:"Fotografia y Pintura"})} />
          <Picker.Item label={('Hamacas')} value={JSON.stringify({id:178, name:"Hamacas"})} />
          <Picker.Item label={('Mantas Wayuu')} value={JSON.stringify({id:176, name:"Mantas Wayuu"})} />
          <Picker.Item label={('Mochilas')} value={JSON.stringify({id:177, name:"Mantas Wayuu"})} />
          <Picker.Item label={('Música')} value={JSON.stringify({id:182, name:"Música"})} />
          <Picker.Item label={('Sombreros')} value={JSON.stringify({id:179, name:"Sombreros"})} />
          <Picker.Item label={('Recetas')} value={JSON.stringify({id:173, name:"Recetas"})} />
         
         
        </Picker>
      </View>
    );
  }

  state = {
    date: {},
    date2:{},
    checkList: [],
    checkList2:[],
    tag:'',
    restriction:'',
    admins:[],
    timeDelete:'',
    showDatePickerModal: false,
    showDatePickerModal2: false,
    showSelectModal: false,
    showInvitations: false,
    showChoiseAdmins:false,
    checked: [],
    showSelectModal2:false,
    modalVisibility:false
  };

  componentDidMount() {
    const {values, id, navigation, initialValues, events, getFriends, fecthUsers, event, auth} = this.props;
    console.log('este es el auth [EDIT_EVENT]', event)
    console.warn('this is the initialValues-->', initialValues)
    
 const images = this.props.navigation.getParam('images')

      
  this.setState({imagesAlter:[...images]})
    this.setState({ categories: categoryEdit(initialValues.categories) });
   
    console.warn('this it the date---->', this.state.date)
  }
  setDateTime = date => {
    const { values } = this.props;

    values.date_created = date.date_created;
    values.endDate = date.endDate;
    this.setState({ date });
  };
  
  setDateTime2 = date => {
    const { values } = this.props;

    values.dateAlert = date.dateAlert;
    this.setState({ date });
    
  };

  setGroup(tag) {
    const { values } = this.props;

    values.tag = tag
    this.setState({ tag });
    this.showSelectModal(false);
  }
  handleCloseModal = (newState) =>{
    console.warn('NEW STATE FOR CLOSE MODAll-->', newState)
  const {values}= this.props  
  this.setState({modalVisibility:false})

      if(newState == 'SAME_FEATURED_SAME_GALERY'){
        this.setState({photosEditState:false})
          values.photosEditState = false
      }else{
        this.setState({photosEditState:true})
        values.photosEditState = true
      }
  }
  handleChangeImages = (imagesAlter)=>{
    const {values} = this.props
    console.warn('IMAGESSSSSS HandleChangeImages--->', imagesAlter)
    this.setState({imagesAlter:imagesAlter})
    values.imagesAlter = imagesAlter
    
  }
 renderModal = () =>{
const {imagesAlter} =this.state
const images = this.props.navigation.getParam('images')

return(
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.modalVisibility}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        this.setState({modalVisibility:!this.state.modalVisibility})
      }}
    >
      <View style={styles.centeredView}>
       
        <View style={styles.modalView}>
        <View style={{position:'relative', top:0, left:'20%', flexDirection:'row-reverse', alignItems:'flex-end', justifyContent:'flex-end'}}>
      <TouchableOpacity 
        onPress={() => this.setState({modalVisibility:false})}
      style={{backgroundColor:'white', width:50, height:50, borderRadius:200, alignItems:'center', textAlign:'center', justifyContent:'center'}}>
        <Text style={{textAlign:'center', alignItems:'center'}}>{'X'}</Text> 
      </TouchableOpacity>
      </View> 
          <PhotosEdit 

              images={imagesAlter}
              prevImages={images}
              handleCloseModal={this.handleCloseModal}
              handleChangeImages={this.handleChangeImages}

            />
         
        </View>
      </View>
    </Modal>
   
  </View>
   )
 }
 renderEventSkeleton() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width:'100%', height:'100%'}}>
        <ActivityIndicator size="large" color="#ffffff" />

    </View>
  );
}
 handleOpenModal = () =>{
  
  this.setState({modalVisibility:true})
 }
  render() {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      initialValues,
      setFieldValue,
      status,
      event,
      t,
      
    } = this.props;

console.warn('IMAGES ALTER--->', this.state.imagesAlter, )
  const productDetails = this.props.navigation.getParam('productDetails');
  const images = this.props.navigation.getParam('images')

   console.log('este es el productDetails', productDetails.invitations)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.TitleEdit}>{'Edicion de Producto'}</Text>
        <KeyboardAwareScrollView> 
          <View>
            <ScrollView>
          {this.renderModal()}
              <View style={styles.formContent}>

  <View style={[styles.detailContent, {paddingTop:20, width:'100%'}]}>
            <Text style={styles.detailTitle}>{'Imagenes:'}</Text>

            <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
        <View style={[{ alignItems:'center', width:'100%', justifyContent:'center', borderColor:'red'}, images.length > 1 || this.imagesAlter > 1 ?{flexDirection:'row'} : null]}>
            <ScrollView 
        horizontal={true}    
        contentContainerStyle={{ paddingRight: 14 }}
  
      style={{alignContent:'center',
     // backgroundColor:"#ffe3b8",
      borderRadius:20,
    marginHorizontal: 20}}>
          {!this.state.photosEditState ?
            images.map(e =>
          <View>
          {!e.src ? this.renderEventSkeleton() :  
          <Image  source={{uri:e.src}} style={{width:200,height:200, borderRadius:50, flexDirection:'row'}}/>}
          </View>
          )
          :
          this.state.imagesAlter.map(e =>
          <View>
          {!e.src ? this.renderEventSkeleton() :  
          <Image  source={{uri:e.src }} style={{width:200,height:200, borderRadius:50, flexDirection:'row'}}/>}
          
          </View>
          ) 
          }
          </ScrollView>
          </View>
          <View style={{alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <TouchableOpacity 
                onPress={() => this.handleOpenModal()}

          style={{backgroundColor:'#ffe3b8', paddingTop:5, marginTop:5, width:'50%', alignItems:'center', justifyContent:'center', borderRadius:10}}>
          <Text style={{alignItems:'center', textAlign:'center', colors:colors.purpleDark,   fontSize: 16,
    marginBottom: 10,
    marginLeft: 20}}>{'Editar Fotos'}</Text>
          </TouchableOpacity>
          </View>
          </View>

</View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Nombre de Producto:'}</Text>
                  <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                    <TextInput
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      style={styles.detailText}
                      maxLength={MAX_NAME_EVENT}
                      autoCapitalize="none"
                      placeholder={'Nombre de Producto'}
                      placeholderTextColor={colors.greyText}
                    />
                    <Text style={styles.maxCharacters}>
                      {handleMaxEventName(values.name.length)}
                    </Text>
                  </View>
                  
                </View>
                <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{'Precio de producto:'}</Text>

                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >

<TextInputMask
  type={'money'}
  options={{
    precision: 0,
    delimiter: '.',
    unit: '$',
    suffixUnit: ''
  }}
  value={`${values.price}`}
  customTextInputProps={{
    style:{ width: '80%', color:'red' },
    label:'Birthday'
  }}
  placeholder={'Coloca el precio'}
  style={styles.detailText}
  placeholderTextColor={colors.greyText}
  onChangeText={handleChange('price')}

/>
                {/* <TextInput
                      onChangeText={handleChange('price')}
                      onBlur={handleBlur('price')}
                      value={`${values.price}`}
                      style={styles.detailText}
                      maxLength={MAX_NAME_EVENT}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'Precio'}
                      placeholderTextColor={colors.greyText}
                    /> */}
            </View>
                </View>
                

                
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Peso del producto (Kg):'}</Text>
                  
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                <TextInput
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      value={`${values.weight}`}
                      style={styles.detailText}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'Peso'}
                      placeholderTextColor={colors.greyText}
                    />
            </View>
                
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Ancho (cm):'}</Text>
                  
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                <TextInput
                      onChangeText={handleChange('width')}
                      onBlur={handleBlur('width')}
                      value={`${values.width}`}
                      style={styles.detailText}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'Ancho'}
                      placeholderTextColor={colors.greyText}
                    />
            </View>
                
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Alto (cm):'}</Text>
                  
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                <TextInput
                      onChangeText={handleChange('height')}
                      onBlur={handleBlur('height')}
                      value={`${values.height}`}
                      style={styles.detailText}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'Alto'}
                      placeholderTextColor={colors.greyText}
                    />
            </View>
                
                </View>
               
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Largo (cm):'}</Text>
                  
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                <TextInput
                      onChangeText={handleChange('length')}
                      onBlur={handleBlur('length')}
                      value={`${values.length}`}
                      style={styles.detailText}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      placeholder={'Largo'}
                      placeholderTextColor={colors.greyText}
                    />
            </View>
                
                </View>
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Manejo de Inventario:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.androidSelectStockManege()}</View>
                   </View>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Cantidad en Inventario:'}</Text>
                  
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                <TextInput
                      onChangeText={handleChange('stock_quantity')}
                      onBlur={handleBlur('stock_quantity')}
                      value={values.stock_quantity == null ? 0 : `${values.stock_quantity}`}
                      style={styles.detailText}
                      keyboardType="numeric"
                      placeholder={'Cantidad en Inventario'}
                      placeholderTextColor={colors.greyText}
                    />
             </View>
                
                </View>
                
                <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Descripcion del Producto:'}</Text>
                  <TextInput
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    numberOfLines={7}
                    multiline={true}
                    style={styles.detailTextDescription}
                    placeholder={'Crea una descripcion del producto'}
                    placeholderTextColor={colors.greyText}
                  />
                 
                </View>
                {/* <View style={styles.detailContent}>
                  <Text style={styles.detailTitle}>{'Nota para el cliente luego de la compra:'}</Text>
                  <TextInput
                    onChangeText={handleChange('purchase_note')}
                    onBlur={handleBlur('purchase_note')}
                    value={values.purchase_note}
                    numberOfLines={7}
                    multiline={true}
                    style={styles.detailTextDescription}
                    placeholder={'Crea una nota para el cliente luego de la compra'}
                    placeholderTextColor={colors.greyText}
                  />
                 
                </View> */}
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Estado en Catalogo:'}</Text>  
                   <View style={styles.inputCatAndr}>
                <View style={{marginLeft:20}}>{this.androidSelectCatalogVisibility()}</View>
                 
                   </View>
                </View>
                
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Categoria:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.androidSelectCategory()}</View>
                   </View>
                </View>
                {/* <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Destacamiento:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.androidSelectfeatured()}</View>
                   </View>
                </View> */}
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Permitir Retrasos:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.backordersState()}</View>
                   </View>
                </View>
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Estado en Inventario:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.androidSelectInStore()}</View>
                   </View>
                </View>
                <View style={styles.detailContent}>
                    <Text style={styles.detailTitle}>{'Estado:'}</Text>  
                   <View style={styles.inputCatAndr}>
                      <View style={{marginLeft:20}}>{this.androidSelectState()}</View>
                   </View>
                </View>
               
              </View> 
              <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>{'Tipo:'}</Text>  

                <View style={{marginLeft:20}}>{this.androidSelectType()}</View>
              </View>
              <View style={{ marginBottom: 40 }}>
                <ButtonField
                  text={'Actualizar'}
                  onHandleSubmit={handleSubmit}
                  status={status}                  
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dac292',

    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 65 : 65
  },
  formContent: {
    marginTop: 40
  },
  iconDate: {
    marginLeft: 10
  },
  errorText: {
    color: colors.red,
    fontSize: 13,
    marginTop: 3,
    marginLeft: 20
  },
  detailContent: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    width:'90%',
    borderBottomColor: '#D8D8D8',
    marginBottom: 40
  },
  detailDirection:{
    paddingBottom: 14,
    paddingHorizontal:10,
    marginLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginBottom: 40
  },
  detailTitle: {
    color: colors.greyLight,
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 20
  },
  TitleEdit: {
    color: colors.greyLight,
    fontSize: 20,
    fontWeight:'700',
    textAlign:'center',
    alignItems:'center',
    marginBottom: 10,
    marginLeft: 20
  },
  detailText: {
    color: colors.purpleDark,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20
  },
  detailTextDescription: {
    color: colors.purpleDark,
    fontSize: 16,
    height:100,
    fontWeight: '400',
    marginLeft: 20
  },
  userImageList: {
    width: 31,
    height: 31,
    marginRight: 3,
    borderRadius: 15
  },
  imageContent: {
    marginLeft: 20,
    flexDirection: 'row'
  },
  selectContainer: {
    marginTop: 40,
    height: '100%',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between'
  },
  select: {
    height: 260,
    borderTopColor: '#cccccc',
    borderWidth: 1,
    width: '100%',
    bottom: 1,
    left: 0,
    position: 'absolute',
    backgroundColor: '#ffffff'
  },
  selectButton: {
    padding: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectBtnText: {
    fontSize: 20,
    color: colors.green
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width:'100%',
    height:'80%',
  },
  modalView: {
    margin: 20,
    width:'80%',
    height:'90%',
    backgroundColor:'#dac292',
  //  backgroundColor: 'transparent',
  // backgroundColor:'rgba(50, 50, 50, 0.8)',
    borderRadius: 5,
    padding: 2,
    alignItems: "center",

    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  maxCharacters: {
    position: 'absolute',
    right: 30,
    top: 3,
    color: '#D8D8D8',
    fontSize: 12
  }
});

const enhanced = withFormik({
  mapPropsToValues: props => {
    const productDetails = props.navigation.getParam('productDetails');
    const images = props.navigation.getParam('images')
    const { name, categories, type, etiquetas, description,catalog_visibility, width, height, length, purchase_note, invitations,manage_stock, stock_quantity, status, featured, in_stock, weight, price, restriction, backorders, admins, timeDelete} = productDetails;
 console.warn('THIS IS THE data stock_quantity-->', stock_quantity )
    console.warn('this is the restriction--->', restriction)
  console.warn('WITH FORMIK TYPE--->', type)
    const userInvt = map(invitations, item => ({
      userId: item.userId
    }));
console.log(etiquetas)
    return {
      name,
      catalog_visibility,
      categories,
      width,
      height,
      length,
      type,
      imagesAlter:images,
      purchase_note,
      manage_stock,
      stock_quantity,
      backorders,
      status,
      featured,
      in_stock,
      weight,
      description,
      price,
    };
  },
  validate: values => {
    const errors = {};
  
    return errors;
  }, 
 
  handleSubmit: async (values, {props}) => {
const productDetails = props.navigation.getParam('productDetails');
const images = props.navigation.getParam('images')
//prev--->

let prevFeture = images.filter(e => e.position  == 0) !== false ? images.filter(e => e.position  == 0).reduce((acc, item)=>{
    acc['position']=item.position,
    acc['src']=item.src
  return acc
},{}) : {}
///

console.warn('PREVGALERY CONSOLE--->', prevGalery, 'PREVFETURE COSOLE--->', prevFeture)

///NEWS ADD---->
let lastGaleryADD = []
          values.imagesAlter.filter(function(obj){
            if(images.findIndex(e => e.src == obj.src) == -1 && values.imagesAlter[0].src !== obj.src){
              //hay nueva(s) de galeria
              lastGaleryADD.push(obj)
            }
          })
let lastFeturedADD = []
          values.imagesAlter.filter(function(ebj){
              if(images.findIndex(e => e.src == ebj.src)== -1 && values.imagesAlter[0].src == ebj.src){
                //Hay una nueva foto de Featured
                  lastFeturedADD.push(ebj)
              }
          })
//NEWS LESS --->
let lastGaleryLESS = []
          images.filter(function(obj){
            if(values.imagesAlter.findIndex(e => e.src == obj.src) == -1 && images[0].src !== obj.src){
              //Hay una fotos menos en galeria
              lastGaleryLESS.push({position:obj.position})
            }
          })
let lastFeturedLESS = []
      images.filter(function(ebj){
              if(values.imagesAlter.findIndex(e => e.src == ebj.src)== -1 && images[0].src == ebj.src){
                //No hay Featured image
                  lastFeturedLESS.push(ebj)
              }
          })
let prevGalery = images.filter(e => e.position !== 0) !== false ? images.filter(e => e.position !== 0).reduce((acc, item)=>{
         
          acc.push({position:item.position, src:item.src, id:item.id})
         
            return acc
},[]) : []
let destructPrevGalery  = prevGalery.reduce((acc, eb)=>{

   if(lastGaleryLESS.findIndex(i => i.position == eb.position) == -1){
        acc.push(eb)
    }
    return acc
},[]) 
      
      
console.warn('prevDates---->', )
    let {id} = productDetails
    console.warn('ENTRA con estos datos-->', lastFeturedADD, lastGaleryADD, lastFeturedLESS, lastGaleryLESS)

if(!lastFeturedADD.length && !lastGaleryADD.length && !lastFeturedLESS.length && !lastGaleryLESS.length){
  console.warn('ENTRA AQUI EN  0 TODO--->', lastFeturedADD, lastGaleryADD, lastFeturedLESS, lastGaleryLESS)
const returnAdd0  = utilFormating(values)
console.warn('RETURN DATA FOR SAME_FEATURED_SAME_GALERY---->', returnAdd0)
 await  props.updateProduct(props.auth, id, returnAdd0)
  .then(()=>{
    successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
     props.navigation.navigate('productList')
  })
}
if(lastFeturedADD.length && !lastGaleryADD.length && !lastFeturedLESS.length && !lastGaleryLESS.length){
  console.warn('ENTRA EN ADDD FEATURED CON ESTA IMAGEN ---->', lastFeturedADD)
      await  props.updateImages(lastFeturedADD, 'ADD_FEATURED_SAME_GALERY').then(async(RES)=>{
        const returnADD_SAME = utilsFormatingWithImage('ADD_FEATURED_SAME_GALERY', values, {featured:{"src":RES.value.urlfetured}, galery:prevGalery})
        console.warn('PARSEO--ADD_FEATURED_SAME_GALERY-->', returnADD_SAME)
     await  props.updateProduct(props.auth, id, returnADD_SAME)
     .then(()=>{
       successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
       props.navigation.navigate('productList')

       })
    }) 
  }
if(lastFeturedADD.length && lastGaleryADD.length && !lastFeturedLESS.length && !lastGaleryLESS.length){
    await  props.updateImages(lastFeturedADD.concat(lastGaleryADD), 'ADD_FEATURED_ADD_GALERY').then(async(RES)=>{
      const returnADD_ADD = utilsFormatingWithImage('ADD_FEATURED_ADD_GALERY', values, {featured:{"src":RES.value.urlfetured}, galery:prevGalery.concat(RES.value.url)})
      console.warn('PARSEO--ADD_FEATURED_ADD_GALERY-->', returnADD_ADD)

    await  props.updateProduct(props.auth, id, returnADD_ADD)
    .then(()=>{
      successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
      props.navigation.navigate('productList')
      })

    .catch((ERRO)=>{
      errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
       console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
     })
    })
    .catch((ERRO)=>{
      errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
       console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
     })
  }
  if(!lastFeturedADD.length && lastGaleryADD.length && !lastFeturedLESS.length && !lastGaleryLESS.length){
    console.warn('ENTRA A SAME FEATURED AND ADD GALERY---->', lastGaleryADD)
    await  props.updateImages(lastGaleryADD,'SAME_FEATURED_ADD_GALERY').then(async(RES)=>{
      const returnADD_ADD = utilsFormatingWithImage('SAME_FEATURED_ADD_GALERY', values, {featured:prevFeture, galery:destructPrevGalery.concat(RES.value.url)})
      console.warn('PARSEO--ADD_FEATURED_ADD_GALERY-->', returnADD_ADD)

     await  props.updateProduct(props.auth, id, returnADD_ADD)
     .then((RIS)=>{
       console.warn('RESPONSE FOR WORDPRESS SAME FEATURED ADD GALERY-->', RIS)
       successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
       props.navigation.navigate('productList')

       })
       .catch((ERRO)=>{
        errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
         console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
       })
    })
    .catch((ERRO)=>{
      errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
       console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
     })
  }
if(!lastFeturedADD.length && !lastGaleryADD.length && lastFeturedLESS.length && !lastGaleryLESS.length){
      const returnLESS_SAME  = utilsFormatingWithImage('LESS_FEATURED_SAME_GALERY', values, {featured:prevGalery[0], galery:prevGalery})
      console.warn('PARSEO--LESS_FEATURED_SAME_GALERY-->', returnLESS_SAME)
       await  props.updateProduct(props.auth, id, returnLESS_SAME)
         .then(()=>{
            successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
            props.navigation.navigate('productList')

      })
  }

if(!lastFeturedADD.length && lastGaleryADD.length && lastFeturedLESS.length && !lastGaleryLESS.length){
    await props.updateImages(lastGaleryADD, 'LESS_FEATURED_ADD_GALERY').then(async(RES)=>{
      const returnSameLESS_ADD  = utilsFormatingWithImage('LESS_FEATURED_ADD_GALERY', values, {featured:{"src":RES.value.url[0].src}, galery:prevGalery.concat(RES.value.url)})
      console.warn('PARSEO--LESS_FEATURED_ADD_GALERY-->', returnSameLESS_ADD)

     await props.updateProduct(props.auth, id, returnSameLESS_ADD)
     .then(()=>{
       successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
       props.navigation.navigate('productList')
       })
    .catch((ERRO)=>{
      errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
       console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
     })
    })
    .catch((ERRO)=>{
      errorMessage('Error', 'Por favor, escoge una imagen de menos resolución')
       console.warn('ERROR FOR RESPONSE WORDPRESS SAME FETURED ADD GALERY--->', ERRO)
     })
  }
  if(!values.imagesAlter){
    const returnLESS_LESS_ALL  = utilsFormatingWithImage('LESS_ALL', values, {featured:{}, galery:lastGaleryLESS})
    console.warn('PARSEO--LESS_FEATURED_LESS_GALERY-->', returnLESS_LESS_ALL)
     await  props.updateProduct(props.auth, id, returnLESS_LESS_ALL)
   .then(()=>{
     successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
     props.navigation.navigate('productList')
   })
}
if(!lastFeturedADD.length && !lastGaleryADD.length && lastFeturedLESS.length && lastGaleryLESS.length && values.imagesAlter.length){
     
        const returnLESS_LESS  = utilsFormatingWithImage('LESS_FEATURED_LESS_GALERY', values, {featured:prevGalery[0], galery:destructPrevGalery.concat(lastGaleryLESS)})
      console.warn('PARSEO--LESS_FEATURED_LESS_GALERY-->', returnLESS_LESS)
       await  props.updateProduct(props.auth, id, returnLESS_LESS)
     .then(()=>{
       successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
       props.navigation.navigate('productList')
     })
  }
  if(!lastFeturedADD.length && lastGaleryADD.length && !lastFeturedLESS.length && lastGaleryLESS.length){
    console.warn('ENTRO A SAME FEATURED LESS GALERY AND ADD GALERY')
    await props.updateImages(lastGaleryADD, 'SAME_FEATURED_ADD_GALERY').then(async(RES)=>{
    const returnLESS_LESS  = utilsFormatingWithImage('SAME_FEATURED_ADD_GALERY', values, {featured:prevFeture, galery:destructPrevGalery.concat(lastGaleryLESS).concat(RES.value.url)})
    console.warn('PARSEO--SAME_FEATURED_LESS_GALERY_ADD_GALERY -->', returnLESS_LESS)
        await  props.updateProduct(props.auth, id, returnLESS_LESS)
      .then(()=>{
        successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
        props.navigation.navigate('productList')
      })
   })
}
if(!lastFeturedADD.length && !lastGaleryADD.length && !lastFeturedLESS.length && lastGaleryLESS.length){
  console.warn('ENTRO A SAME_FETURED_LESS_GALERY')
  const returnLESS_LESS  = utilsFormatingWithImage('SAME_FETURED_LESS_GALERY', values, {featured:prevFeture, galery:destructPrevGalery.concat(lastGaleryLESS)})
  console.warn('PARSEO--SAME_FEATURED_LESS_GALERY_ADD_GALERY -->', returnLESS_LESS)
      await  props.updateProduct(props.auth, id, returnLESS_LESS)
    .then(()=>{
      successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
      props.navigation.navigate('productList')
    })
 
}

if(lastFeturedADD.length && !lastGaleryADD.length && lastFeturedLESS.length && !lastGaleryLESS.length){
  console.warn('ENTRO A LESS_FEATURED_ADD_FEATURED_SAME_GALERY')
  await props.updateImages(lastFeturedADD, 'ADD_FEATURED_SAME_GALERY').then(async(RES)=>{

  const returnLESS_LESS  = utilsFormatingWithImage('ADD_FEATURED_SAME_GALERY', values, {featured:{"src":RES.value.urlfetured}, galery:prevGalery})
  console.warn('PARSEO--SAME_FEATURED_LESS_GALERY_ADD_GALERY -->', returnLESS_LESS)
      await  props.updateProduct(props.auth, id, returnLESS_LESS)
    .then(()=>{
      successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
      props.navigation.navigate('productList')
    })

  })
 
}
if(lastFeturedADD.length && !lastGaleryADD.length && lastFeturedLESS.length && lastGaleryLESS.length){
  console.warn('ENTRO A LESS_FEATURED_ADD_FEATURED_SAME_GALERY')
  await props.updateImages(lastFeturedADD, 'ADD_FEATURED_SAME_GALERY').then(async(RES)=>{

  const returnLESS_LESS  = utilsFormatingWithImage('ADD_FEATURED_SAME_GALERY', values, {featured:{"src":RES.value.urlfetured}, galery:destructPrevGalery.concat(lastGaleryLESS)})
  console.warn('PARSEO--SAME_FEATURED_LESS_GALERY_ADD_GALERY -->', returnLESS_LESS)
      await  props.updateProduct(props.auth, id, returnLESS_LESS)
    .then(()=>{
      successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
      props.navigation.navigate('productList')
    })

  })
 
}

if(lastFeturedADD.length && lastGaleryADD.length && lastFeturedLESS.length && lastGaleryLESS.length){
  console.warn('ENTRO A ADD_GALERY_LESS_GALERY_ADD_FEATURED_LESS_FEATURED')
  await props.updateImages(lastFeturedADD.concat(lastGaleryADD), 'ADD_FEATURED_ADD_GALERY').then(async(RES)=>{

  const returnLESS_LESS  = utilsFormatingWithImage('ADD_FEATURED_ADD_GALERY', values, {featured:{"src":RES.value.urlfetured}, galery:destructPrevGalery.concat(lastGaleryLESS).concat(RES.value.url)})
  console.warn('PARSEO--SAME_FEATURED_LESS_GALERY_ADD_GALERY -->', returnLESS_LESS)
      await  props.updateProduct(props.auth, id, returnLESS_LESS)
    .then(()=>{
      successMessage('Muy bien', 'Producto satisfactoriamente actualizado')
      props.navigation.navigate('productList')
    })

  })
 
}
},
  

  displayName: 'AddEventForm'
})(EditEvent);

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
export default connect(
  mapStateToProps,
  {
    updateProduct,
    updateImages
  }
)(withTranslation(['event', 'editEvent'])(enhanced));

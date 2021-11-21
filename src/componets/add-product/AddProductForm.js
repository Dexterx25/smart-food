/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Picker,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty, props } from 'ramda';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';
//import CurrencyInput from 'react-native-currency-input';
//import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text'

import { getTags, getFriends } from '../../actions'

import Icon from '../../libs/CustomIcon';
import { colors, buttonPrimary, inputText } from '../../libs/styles';
import {
  handleHitSlop,
  handleMaxCharacters
} from '../../libs/helpers';
import { SafeAreaView } from 'react-navigation';

const MAX_NAME_PRODUCT = 45
const handleMaxProductName = handleMaxCharacters(MAX_NAME_PRODUCT)


class AddEventForm extends Component {
  state = {
    showModal: false,
    showSelectModal: false,
    showModal2:false,
    type:'',
    category:'',
    price:0,
    date: {},
    touchable:false
  };


 componentDidMount = async () =>{
   const {list} = this.props
   console.warn('LISTA DE PRODUCTOS---->', list)
   try {
    console.warn('consola activada')
  } catch (e) {
    console.warn('Error:', e)
  }
 }

  showSelectModal = visible => {
    this.setState({ showSelectModal: visible });
  };

  showModal = visible => {
    this.setState({ showModal: visible });
  };
  showModal2 = visible => {
    this.setState({ showModal2: visible });
  };

  errorMessage(touched, error, value) {
    return error ? (
      touched ? (
        <Icon style={styles.error} name="error-mark" size={18} />
      ) : null
    ) : isEmpty(value) ? null : (
      <Icon style={styles.check} name="check-mark" size={18} />
    );
  }

  showDatePickerAlert() {
    const {list} = this.props
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => false}
        transparent={false}
        visible={this.state.showModal2}
      >

        <View style={{ marginTop: 40 }}>
          <View>
            
          </View>
          
        </View>
      </Modal>
    );
  }

  renderAlertPicker() {
    const { t, values } = this.props;

    if (values.dateAlert) {
      return (
        <TouchableOpacity
          style={styles.inputText}
          onPress={() => this.showModal2(true)}
          hitSlop={handleHitSlop(14)}
        >
          <View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.inputText}
        onPress={() => this.showModal2(true)}
        hitSlop={handleHitSlop(14)}
      >
        <Text style={{ color: '#D3D3D7', fontSize: 16 }}>
          {t('dateAlert')}
        </Text>
      </TouchableOpacity>
      
    );
    
  }
  showDatePicker() {
    const {list} = this.props
    return (
      <Modal
        animationType="slide"
        onRequestClose={() => false}
        transparent={false}
        visible={this.state.showModal}
      >

        <View style={{ marginTop: 40 }}>
          <View>
         
            
          </View>
          
        </View>
      </Modal>
    );
  }

  renderDateRangeInput() {
    const { t, values } = this.props;

    if (values.startDate) {
      return (
        <TouchableOpacity
          style={styles.inputText}
          onPress={() => this.showModal(true)}
          hitSlop={handleHitSlop(14)}
        >
          <View>
          
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.inputText}
        onPress={() => this.showModal(true)}
        hitSlop={handleHitSlop(14)}
      >
        <Text style={{ color: '#D3D3D7', fontSize: 16 }}>
          {t('dateAndHourText')}
        </Text>
      </TouchableOpacity>
      
    );
    
  }
  androidSetCategory(category) {
    const { values } = this.props;
    values.category = category;
    this.setState({ category });
  }
  androidSetType(type) {
    const { values } = this.props;
    values.type = type;
    this.setState({ type });
  }
 
  androidSelectCategory() {
    const colorText = isEmpty(this.state.category) ?  'white' : colors.purpleDark;
    return (
      <View>
        <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.category}
          onValueChange={item => this.androidSetCategory(item)}
        >
          <Picker.Item label={('Seleccionar categoría')} value="0" />
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
  handleStateTouchable = ()=>{
    this.setState({touchable:true})
  }
  androidSelectType() {
    const colorText = isEmpty(this.state.type)  ?  'white' : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.type}
          onValueChange={item => this.androidSetType(item)}
        >
          <Picker.Item label={('Seleccionar tipo (simple por defecto)')} value={JSON.stringify({id:'simple'})} />
          <Picker.Item label={('Simple')} value={JSON.stringify({id:'simple', name:"Simple"})} />
          <Picker.Item label={('Externo')} value={JSON.stringify({id:'external', name:"Externo"})} />
    </Picker>
      </View>
    );
  }
  
  render() {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      setFieldValue,
      handleSubmit,
      navigation,
      t
    } = this.props;
    // const { category } = this.state;
   
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#dac292', paddingTop:60 }} >
             <StatusBar barStyle='dark-content'  />

      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <View>
            <ScrollView>
              <View style={styles.formContent}>
                <Text style={styles.formTitle}>{('Formulario de Producto')}</Text>
                
              
                  <View style={styles.inputSection}>
                 
                  <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                    <TextInput
                      onChangeText={handleChange('productName')}
                      onBlur={handleBlur('productName')}
                      value={values.productName}
                      style={[styles.inputText, { flexBasis: '100%' }]}
                      maxLength={MAX_NAME_PRODUCT}
                      placeholder={"Nombre del Producto"}
                      placeholderTextColor={'white'}
                    />
                    {errors.productName ? (
                   touched.productName ? (
                  <Text style={styles.errorText}>{errors.productName}</Text>
                     ) : null
                      ) : null}
                    <Text style={styles.maxCharacters}>
                      {handleMaxProductName(values.productName.length)}
                    </Text>
                    
                  </View>
                  
                       
                </View>
               
        
                       
               

                <View style={styles.inputSection}>
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
  style={styles.inputText}
  placeholderTextColor={'white'}
  onChangeText={handleChange('price')}

/>
  
   
                  {/* <TextInput
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    value={values.price}
                    style={styles.inputText}
                    placeholder={'Coloca el precio'}
                    placeholderTextColor={'white'}
                    keyboardType="numeric"

                  /> */}
              {errors.price ? (
                   touched.price ? (
                  <Text style={styles.errorText}>{errors.price}</Text>
                     ) : null
                      ) : null}
                      </View>
                </View>                
              
              <View style={{paddingTop:20}}>
                <View style={styles.inputCatAndr}>
                <View>{this.androidSelectType()}</View>
                </View>
                {errors.type ? (
                   touched.type ? (
                  <Text style={styles.errorText}>{errors.type}</Text>
                     ) : null
                      ) : null}
                <View style={styles.inputCatAndr}>
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                      <View>{this.androidSelectCategory()}</View>
                  </View>
                </View>
                {errors.category ? (
                   touched.category ? (
                  <Text style={styles.errorText}>{errors.category}</Text>
                     ) : null
                      ) : null}
              </View>
              </View>
              <View style={styles.btnContent}>
                <TouchableOpacity
                  style={styles.buttonForm}
                   onPress={handleSubmit}
                  //  onPress={() => this.props.navigation.navigate('AddEventForm2',{values})}
                  hitSlop={handleHitSlop(14)}
                >
                  <Image  source={require('../icon/images/nextIcon.jpeg')} style={{width:50, height:50, borderRadius:100}}/>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </View>
      </SafeAreaView>
    );
  }
}
//  moment([])
const enhanced = withFormik({
  mapPropsToValues: (props) => ({
    productName: '',
    price: '',
    category:'',
    type:''
  }),
  

  validate : (values, props) => {
    let errors = {};
    if (isEmpty(values.productName)) {
      errors.productName = 'Nombre de producto Vacio';
    }
    if (isEmpty(values.price)) {
      errors.price = 'Escribe un valor para el producto';
    }
    if (isEmpty(values.category)) {
      errors.category = 'Escoge al manos una categoria para el producto';
    }
   
    return errors;
  },
  handleSubmit: (values, {props}) => {
  console.warn('THIS IS THE VALUEEEEEES_-->', values)
  console.warn('THIS IS THE PROPS HANDLESUBMIT-->', props)
     const screen = 'addProductScreen';
     props.navigation.navigate('AddEventForm2', {values:values})

  },


  displayName: 'AddEventForm'
})(AddEventForm);

const styles = StyleSheet.create({
  check: {
    color: colors.green,
    position: 'absolute',
    bottom: 20,
    marginRight: 20,
    right: 1
  },
  inputIconOption:{
    position: 'relative',
    height: 20,
    bottom: 8
  },
  
  inputTextHide: {
    position: 'absolute',
    opacity: 0
  },
  inputCatAndr: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    position: 'relative',
    zIndex: 50,
    paddingTop:30,
    flexBasis: '80%',
    color:'white',
    paddingTop:50,
    paddingRight:22,
    paddingBottom:30,
    marginLeft: 5,
    width: '90%',
  },
  inputSection: {
    marginTop: 55,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  },
  inputSectionDescription: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
  },
  inputText: {
    ...inputText,
    paddingLeft: 15,
    marginTop: 0,
    flexBasis: '80%',
    paddingRight: 0,
  },
  inputText2:{
    paddingLeft: 15,
    marginTop: 0,
    paddingRight: 0,
  },
  inputIcon: {
    position: 'relative',
    height: 20,
    bottom: 8
  },
  error: {
    color: colors.red,
    position: 'absolute',
    bottom: 20,
    marginRight: 20,
    right: 1
  },
  textSmall: {
    fontSize: 13,
    color: '#C4C4CB',
    textAlign: 'right',
    marginTop: 18,
    marginRight: 18
  },
  formTitle: {
    color: colors.purpleDark,
    fontSize: 30,
    fontWeight: '500'
  },
  errorText: {
    color: colors.red,
    fontSize: 13,
    marginTop: 3
  },
  container: {
    paddingTop:70,
    backgroundColor: '#dac292',
    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1
  },
  icon: {
    color: colors.green,
    // paddingBottom: 25,
    marginLeft: 20,
    marginTop: 70
  },
  iconDate: {
    marginLeft: 10
  },
  formContent: {
    marginLeft: 35
  },
  buttonForm: {
    ...buttonPrimary,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 0,
    paddingTop: 0,
    marginRight: 20
  },
  buttonForm2: {
    ...buttonPrimary,
    width: 250,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 0,
    paddingTop: 0,
    marginRight: 20
  },
  
  btnContent: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
    
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
    borderTopColor: '#D8D8D8',
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
  maxCharacters: {
    position: 'absolute',
    right: 0,
    top: 2,
    color: '#D8D8D8',
    fontSize: 12
  }
});

function mapStateToProps(state) {
  const {
    products:{list}
  } = state
  return{
list
  }
}

export default connect(mapStateToProps, {
 
})(enhanced)

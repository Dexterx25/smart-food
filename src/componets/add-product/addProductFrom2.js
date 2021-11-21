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
  Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from 'ramda';
import { capitalize } from 'lodash';
import { withFormik } from 'formik';

import { getTags, getFriends } from '../../actions'

import Icon from '../../libs/CustomIcon';
import { colors, buttonPrimary, inputText } from '../../libs/styles';
import {
  handleHitSlop,
  handleMaxCharacters
} from '../../libs/helpers';
import { SafeAreaView } from 'react-navigation';

const MAX_NAME_PRODUCT = 25
const handleMaxProductName = handleMaxCharacters(MAX_NAME_PRODUCT)


class AddEventForm2 extends Component {
  state = {
    showModal: false,
    showSelectModal: false,
    showModal2:false,
    type:'',
    catalog_visibility:'',
    date: {}
  };


 componentDidMount = async () =>{
   const {list, navigation} = this.props
   console.warn('LISTA DE PRODUCTOS---->', list)
  const dataParams = navigation.getParam('values')
  console.warn('THIS ARE THE DATAS GET PARAMS-->--->', dataParams)
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
  
  androidSetCatalogVisibility(catalog_visibility) {
    const { values } = this.props;
    values.catalog_visibility = catalog_visibility;
    this.setState({ catalog_visibility });
  }
 

  androidSelectCatalogVisibility() {
    const colorText = isEmpty(this.state.catalog_visibility) ? "white" : colors.purpleDark;
    return (
       <View>
    <Picker
          style={{ height: 20, color: colorText }}
          selectedValue={this.state.catalog_visibility}
          onValueChange={item => this.androidSetCatalogVisibility(item)}
        >
          <Picker.Item label={('Seleccionar visibilidad en catalogo')} value="0" />
          <Picker.Item label={('Visible')} value={JSON.stringify({id:'visible',name:"Visible"})} />
          <Picker.Item label={('En catalogo')} value={JSON.stringify({id:'catalog', name:"En catalogo"})} />
          <Picker.Item label={('Oculto')} value={JSON.stringify({id:'hidden', name:'Oculto'})} />
          <Picker.Item label={('Solo en los resultados de busqueda')} value={JSON.stringify({id:'search', name:"Solo en los resultados de busqueda"})} />
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
                
              

                <View style={styles.inputSectionDescription}>
                <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                  <TextInput
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputText2}
                    placeholder={'Coloca una descripción'}
                    placeholderTextColor={'white'}
                  />
                  {errors.description ? (
                   touched.description ? (
                  <Text style={styles.errorText}>{errors.description}</Text>
                     ) : null
                      ) : null}
                      </View>
                </View>
               
                <View style={styles.inputSectionDescription}>
                  <TextInput
                    onChangeText={handleChange('sku')}
                    onBlur={handleBlur('sku')}
                    value={values.sku}
                    style={styles.inputText2}
                    placeholder={'Identificador Unico (sku) (Opcional)'}
                    placeholderTextColor={'white'}
                  />
                   {errors.sku ? (
                   touched.sku ? (
                  <Text style={styles.errorText}>{errors.sku}</Text>
                     ) : null
                      ) : null}
                </View>
                <View style={styles.inputSectionDescription}>
                  <TextInput
                    onChangeText={handleChange('stock_quantity')}
                    onBlur={handleBlur('stock_quantity')}
                    value={values.stock_quantity}
                    style={styles.inputText2}
                    keyboardType="numeric"
                    placeholder={'Cantidad en Inventario'}
                    placeholderTextColor={'white'}
                  />
                   {errors.stock_quantity ? (
                   touched.stock_quantity ? (
                  <Text style={styles.errorText}>{errors.stock_quantity}</Text>
                     ) : null
                      ) : null}
                </View>
                
                 <View style={{paddingTop:20}}>
                <View style={styles.inputCatAndr}>
                     <View>{this.androidSelectCatalogVisibility()}</View>
                     {errors.catalog_visibility ? (
                   touched.catalog_visibility ? (
                  <Text style={styles.errorText}>{errors.catalog_visibility}</Text>
                     ) : null
                      ) : null}
                </View>
                 </View>
                 
              </View>
              <View style={styles.btnContent}>
                <TouchableOpacity
                  style={styles.buttonForm}
                  onPress={handleSubmit}
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
  mapPropsToValues: () => ({
    description: '',
    catalog_visibility:'',
    sku:'',
    stock_quantity:''
  }),

  validate: values => {
    let errors = {};
    if (isEmpty(values.description)) {
      errors.description = 'Coloca una descripcion a tu producto';
    }
    // if (isEmpty(values.sku)) {
    //   errors.sku = 'Colocar identificador sku';
    // }
   
   
    if (isEmpty(values.catalog_visibility)) {
      errors.catalog_visibility = 'Señala el estado del producto en catalogo';
    }
   
    return errors;
  },
   
   handleSubmit: (values, { props }) => {
    const screen = 'addProduct';
    const dataParams = props.navigation.getParam('values')
  const dataAgruped = Object.assign(dataParams, values)
  console.warn('ESTOS SON LOS DATOS AGRUPADOS-->', dataAgruped)
    props.navigation.navigate('addEventForm3', { values:dataAgruped});
  },

  displayName: 'AddEventForm2'
})(AddEventForm2);

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
    position: 'relative',
    zIndex: 50,
    color:'white',
    paddingBottom:30,
    marginLeft: 5,
    paddingTop:50,
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8'
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingTop:50,
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
    ...inputText,

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

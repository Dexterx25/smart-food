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
import ImagePicker from 'react-native-image-picker';

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


class AddEventForm3 extends Component {
  state = {
    showModal: false,
    showSelectModal: false,
    showModal2:false,
    type:'',
    date: {}
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

  buildImageSource(avatar) {
    if (avatar !== null && typeof avatar === 'object') {
      return { uri: avatar.uri };
    } else if (typeof avatar === 'string') {
      return { uri: avatar };
    }
    return null;
  }

  showImagePicker = () => {
    const { setStatus } = this.props;
    const options = {
      title: i18n.t('imagePicker:title'),
      takePhotoButtonTitle: i18n.t('imagePicker:takePhotoButtonTitle'),
      chooseFromLibraryButtonTitle: i18n.t('imagePicker:chooseFromLibraryButtonTitle'),
      cancelButtonTitle: i18n.t('imagePicker:cancelButtonTitle'),
      cameraType: 'front'
    }
   
    setStatus('pending')

    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
      } else if (response.error) {
        const msg = response.error;
        errorMessage('Error', msg);
      } else {
        this.props.setFieldValue('avatar', response);
      }
      setStatus('success')
    });
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
                    onChangeText={handleChange('weight')}
                    onBlur={handleBlur('weight')}
                    value={values.weight}
                    style={styles.inputText}
                    keyboardType='decimal-pad'
                    
                    placeholder={'Peso del producto (kg)'}
                    placeholderTextColor={'white'}

                  />
            
             </View>
                </View> 
                <View style={styles.inputSection}>
                
               <View
                    style={{flexBasis: '80%', position: 'relative'}}
                  >
                  <TextInput
                    onChangeText={handleChange('width')}
                    onBlur={handleBlur('width')}
                    value={values.width}
                    style={styles.inputText}
                    keyboardType='decimal-pad'

                    placeholder={'Ancho del producto (cm)'}
                    placeholderTextColor={'white'}

                  />
            
             </View>
                </View>    
            
                <View style={styles.inputSection}>
                
                <View
                     style={{flexBasis: '80%', position: 'relative'}}
                   >
                   <TextInput
                     onChangeText={handleChange('height')}
                     onBlur={handleBlur('height')}
                     value={values.height}
                     style={styles.inputText}
                     keyboardType='decimal-pad'

                     placeholder={'Alto del producto (cm)'}
                     placeholderTextColor={'white'}
 
                   />
             
              </View>
                 </View> 

                 <View style={styles.inputSection}>
                
                <View
                     style={{flexBasis: '80%', position: 'relative'}}
                   >
                   <TextInput
                     onChangeText={handleChange('length')}
                     onBlur={handleBlur('length')}
                     value={values.length}
                     style={styles.inputText}
                     keyboardType='decimal-pad'

                     placeholder={'Largo del producto (cm)'}
                     placeholderTextColor={'white'}
 
                   />
             
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
    weight:'',
    width:'',
    height:'',
    length:''
  }),

  validate: values => {
    let errors = {};
    
    return errors;
  },
   
   handleSubmit: (values, { props }) => {
    const screen = 'addProduct';
    const valuesParams = props.navigation.getParam('values')
    const dataAgruped2 = Object.assign(values, valuesParams)
  
    props.navigation.navigate('addProductFrom4', { values:dataAgruped2 });
  },

  displayName: 'AddEventForm3'
})(AddEventForm3);

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
    paddingTop:30,
    color:'white',
    paddingBottom:30,
    marginLeft: 5,
    width: '100%',
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

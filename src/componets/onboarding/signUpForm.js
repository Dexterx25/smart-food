/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
//import {Overlay} from 'react-native-elements';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity, 
  Platform, 
  Button
 
} from 'react-native';
import { isEmpty, values } from 'lodash';


import { FastField, withFormik } from 'formik';
import { Transition } from 'react-navigation-fluid-transitions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BASE_URL as URL}  from 'react-native-dotenv';

import { colors, buttonPrimary, inputText, inputSection } from '../../libs/styles';
import { isEmail, isValidPassword } from '../../libs/validations';
import { authSignUp } from '../../actions';
import {errorMessageAlert} from '../../actions/alerts'
import Icon from '../../libs/CustomIcon';
import ImageIcon from '../icon'
import ButtonField from '../../componets/button';
import { handleHitSlop } from '../../libs/helpers'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { prop } from 'ramda';
import Background from '../background';

class SignUpForm extends Component {

  state = {
    showPassword: false,
    date: new Date(),
    show: false,
    mode: 'date',
    titleDate: false,
    dateVisibility:false,
    isDatePickerVisible:false,
    device:{}
  }
  componentDidMount(){
    const {navigation} = this.props
    const device = navigation.getParam('device', '')
    this.setState({device:device})
  }

  theTitle = () => {
const {t} =  this.props;
return 

  }

  showOverlay = () => {
    this.setState({ show: true}) 
    this.setState({ titleDate: false}) 

  }
hideOverlay = () => {
  const {date} = this.state
    this.setState({ show: false}) 
    this.setState({ titleDate: true}) 
     const alterFormdate = moment(date).format('l')
    this.setState({show:false, chowsenData:alterFormdate})


  }


 setDateTime = date => {
   const { values } = this.props;
   this.setState({ date });
 };

 onChange = (event, selectedDate, currentMode ) => {
   const currentDate = selectedDate || this.state.date;

   this.setState({date:currentDate});


 };



  errorMessage = (touched, error, value) => {
    return error ? (
      touched ? (
        <Icon style={styles.error} name="error-mark" size={18} />
      ) : null
    ) : isEmpty(value) ? null : (
      <Icon style={styles.check} name="check-mark" size={18} />
    );
  }

  handleURL = url => {
    try {
      Linking.openURL(url)
    } catch (err) {
      console.warn(`Error al abrir la pagina ${url}`, err)
    }
  }

  handleShowPassoword = () => {
    this.setState({showPassword: !this.state.showPassword})
  }
  //for android--->
   showDatePicker = () => {
    this.setState({isDatePickerVisible:true})
  };

   hideDatePicker = () => {
    this.setState({isDatePickerVisible:false});
  };

  handleConfirm = (date) => {
    this.setState({ show: false}) 
    this.setState({ titleDate: true}) 
    const alterFormateandroid = moment(date).format('l')
    this.setState({show:false,chowsenData:alterFormateandroid})
    this.hideDatePicker();
   };

  renderShowPassword = () => {
    const { showPassword } = this.state
    return (
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 12, right: 50 }}
        onPress={this.handleShowPassoword}
      >
        <ImageIcon
          name={showPassword ? 'showIcon' : 'notShowIcon'}
          height={27}
          width={27}
          hitSlop={handleHitSlop(12)}
        />
      </TouchableOpacity>
    )
  }

  handleOpenURL = type => {
    switch(type) {
      case 1:
        this.handleURL(`${URL}/trminos-y-condiciones`)
        break
      case 2:
        this.handleURL(`${URL}/terminos-y-condiciones-1`)
        break
      case 3:
        this.handleURL(`${URL}/aviso-de-privacidad`)
        break
    }
  }

  render() {
    const {
      t,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      signStatus,
      
      
    } = this.props;
console.log('ERRORS--->', errors)
    return (
      <Transition appear="right">
        <View style={styles.container}>
          <Background />
          <KeyboardAwareScrollView>
            <View>
              <ScrollView>
                <View style={styles.formContent}>
                  <View style={inputSection}>
                    <Text style={styles.formTitle}>{'FORMULARIO DE REGISTRO'}</Text>
                    <TextInput
                      onChangeText={handleChange('names')}
                      onBlur={handleBlur('names')}
                      value={values.names}
                      style={inputText}
                      placeholder={'Nombres'}
                      placeholderTextColor={colors.greyText}
                    />
                    {this.errorMessage(touched.names, errors.names, values.names)}
                    {errors.names ? (
                      touched.names ? (
                        <Text style={styles.errorText}>{errors.names}</Text>
                      ) : null
                    ) : null}
                  </View>
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('surnames')}
                      onBlur={handleBlur('surnames')}
                      value={values.surnames}
                      style={inputText}
                      placeholder={'Apellidos'}
                      placeholderTextColor={colors.greyText}
                      keyboardType='email-address'

                    />
                    {this.errorMessage(touched.surnames, errors.surnames, values.surnames)}
                    {errors.surnames ? (
                      touched.surnames ? (
                        <Text style={styles.errorText}>{errors.surnames}</Text>
                      ) : null
                    ) : null}
                  </View>
                   <View style={[inputSection,{flexDirection:'row'}]}>
                   <TextInput 
                    onChangeText={handleChange('prefix_number')}
                    onBlur={handleBlur('prefix_number')}
                    value={values.prefix_number}
                    style={[inputText,{width:70, borderRightWidth:0.5, marginRight:10, borderColor:colors.purpleDark}]}
                    placeholder={'Codigo'}
                    placeholderTextColor={colors.greyText}
                   />
                    <TextInput
                      onChangeText={handleChange('phone_number')}
                      onBlur={handleBlur('phone_number')}
                      value={values.phone_number}
                      style={inputText}
                      placeholder={'Telefono celular'}
                      placeholderTextColor={colors.greyText}
                      keyboardType='numeric'
                    />
                    {this.errorMessage(touched.phone_number, errors.phone_number, values.phone_number)}
                    {errors.phone_number? (
                      touched.phone_number ? (
                          <Text style={styles.errorText}>{`${errors.phone_number}\n`}</Text>
                          
                          ) : null
                    ) : null}
                     {errors.prefix_number? (
                      touched.prefix_number ? (
                          <Text style={styles.errorText}>{`${errors.prefix_number}`}</Text>
                          
                          ) : null
                    ) : null}
                  </View>  
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={inputText}
                      emailAddress
                      type="email"
                      keyboardType='email-address'
                      autoCapitalize="none"
                      placeholder={'Correo'}
                      placeholderTextColor={colors.greyText}
                    />
                    {this.errorMessage(touched.email, errors.email, values.email)}
                    {errors.email ? (
                      touched.email ? (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      ) : null
                    ) : null}
                  </View>
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      value={values.weight}
                      style={inputText}
                      placeholder={'Peso'}
                      placeholderTextColor={colors.greyText}
                      keyboardType='numeric'
                    />
                    {this.errorMessage(touched.weight, errors.weight, values.weight)}
                    {errors.weight ? (
                      touched.weight ? (
                        <Text style={styles.errorText}>{errors.weight}</Text>
                      ) : null
                    ) : null}
                  </View>
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('height')}
                      onBlur={handleBlur('height')}
                      value={values.height}
                      style={inputText}
                      placeholder={'Altura'}
                      placeholderTextColor={colors.greyText}
                      keyboardType='numeric'
                    />
                    {this.errorMessage(touched.height, errors.height, values.height)}
                    {errors.height ? (
                      touched.height ? (
                        <Text style={styles.errorText}>{errors.height}</Text>
                      ) : null
                    ) : null}
                  </View>
                   <View style={inputSection}>
{Platform.OS === 'ios' ?
(        <TouchableOpacity  onPress={this.showOverlay}>
        {this.state.titleDate ?  

<Text style={{color:'black', paddingTop:60, fontSize:16, marginBottom:10}}> {`${this.state.chowsenData}`}</Text>
      : 
<Text style={{color:'#D3D3D7', paddingTop:60, fontSize:16, marginBottom:10 }}> { 'Fecha de nacimiento' }</Text>

}
    </TouchableOpacity>  
)    :   ( 
<TouchableOpacity  onPress={this.showDatePicker}>
{this.state.titleDate ?  

<Text style={{color:'black', paddingTop:60, fontSize:16, marginBottom:10}}> {`${this.state.chowsenData}`}</Text>
: 
<Text style={{color:'#D3D3D7', paddingTop:60, fontSize:16, marginBottom:10 }}> {'Fecha de nacimiento' }</Text>

}
{this.errorMessage(touched.date_birtday, errors.date_birtday, values.date_birtday)}
                    {errors.date_birtday ? (
                      touched.date_birtday ? (
                        <Text style={styles.errorText}>{errors.date_birtday}</Text>
                      ) : null
                    ) : null}
</TouchableOpacity>    )
  }
    {Platform.OS === 'ios' && this.state.show ? (
      <View>
          <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={this.state.mode}
          is24Hour={false}
          display="spinner"
          onChange={this.onChange}
          textColor="black"
          style={{backgroundColor:'white ', color:'grey'}}
          
          />
          
        <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
        
            <View >
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{ paddingHorizontal: 15, fontSize:24 }}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <TouchableOpacity onPress={this.hideOverlay}>
                <Text style={{ paddingHorizontal: 15, color: 'green', fontSize:24 }}>Done</Text>
              </TouchableOpacity>
            </View>
            

        </View>
         
          
    </View>) : ( 
     <View>
     
       <DateTimePickerModal
         isVisible={this.state.isDatePickerVisible}
         mode="date"
         isDarkModeEnabled={"true"}
         onConfirm={this.handleConfirm}
         onCancel={this.hideDatePicker}
       />
     
     </View>
     )

    }
  

     {!this.state.show && <><TextInput style={{paddingTop:60, display:'none'}}  value = {values.date_birtday = `${this.state.chowsenData}`} /></>
                    }
   
    </View> 
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={inputText}
                      secureTextEntry={!this.state.showPassword}
                      placeholder={'Contraseña'}
                      autoCapitalize="none"
                      placeholderTextColor={colors.greyText}
                    />
                    {this.renderShowPassword()}
                    {this.errorMessage(touched.password, errors.password, values.password)}
                    {errors.password ? (
                      touched.password ? (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      ) : null
                    ) : null}
                  </View>
                  <View style={inputSection}>
                    <TextInput
                      onChangeText={handleChange('password_verification')}
                      onBlur={handleBlur('password_verification')}
                      value={values.password_verification}
                      style={inputText}
                      secureTextEntry={!this.state.showPassword}
                      placeholder={'Verificacion Contraseña'}
                      autoCapitalize="none"
                      placeholderTextColor={colors.greyText}
                    />
                    {this.renderShowPassword()}
                    {this.errorMessage(touched.password_verification, errors.password_verification, values.password_verification)}
                    {errors.password_verification ? (
                      touched.password_verification ? (
                        <Text style={styles.errorText}>{errors.password_verification}</Text>
                      ) : null
                    ) : null}
                  </View>
                </View>
                <View style={styles.btnContent}>
                  <ButtonField
                    text={'REGISTRAR'}
                    onHandleSubmit={handleSubmit}
                    status={signStatus}
                    style={{  backgroundColor:'white',
                    borderColor:colors.purple,
                    borderWidth:2,}}
                  />
                </View>
               
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Transition>
    );
  }
}

const enhanced = withFormik({
  mapPropsToValues: () => ({
    names: '',
    surnames: '',
    email: '',
    password: '',
    password_verification:'', 
    date_birtday: '',
    phone_number:'',
    prefix_number:'',
    weight:'',
    height:''
  }),

  validate: values => {
    const errors = {};

    if (isEmpty(values.email)) {
      errors.email = 'Es necesario suministrar correo electronico'
    } else if (!isEmail(values.email)) {
      errors.email = 'Debes suministrar un correo elecronico válido'
    }
    

    if (isEmpty(values.names)) {
      console.log('NAMES ERROR EMPATY!--->', values.names)
      errors.names = 'Debes colocar nombres'
    }
    if(isEmpty(values.prefix_number)){
      errors.prefix_number = 'Es necesario colocar Indicativo número de celular'
    }

    if (isEmpty(values.phone_number)) {
      errors.phone_number = 'Debes colocar un numero de celular'
    }

    if (isEmpty(values.surnames)) {
      errors.surnames = 'Es necesario colocar apellidos'
    }
    if(isEmpty(values.weight)){
      errors.weight = 'Es necesario suministrar peso'
    }
    if(isEmpty(values.height)){
      errors.height = 'Es necesario suministrar Estatura'
     }
     if(isEmpty(values.password_verification)){
       errors.password_verification = 'Es necesario colocar aqui nuevamente la contraseña'
     }
    if(isEmpty(values.date_birtday)){
      errors.date_birtday = 'La fecha de nacimiento debe ser suministrada'
    }
    if (isEmpty(values.password)) {
      errors.password = 'Debes suministrar una contraseña'
    } else if (!isValidPassword(values.password)) {
      errors.password = 'Debes suministrar una contraseña con 8 o más caracteres.'
    }else if(values.password !== values.password_verification){
      errors.password = 'La contraseña y la contraseña de verificacion no coinciden'
    }
    return errors;
  },

  handleSubmit: async(values, { props }) => {
    try {
      await props.authSignUp(values)
      .then(()=>{
        props.navigation.navigate('main')
      })

    } catch (error) {
      console.log('THIS IS THE ERROR authSignUp-->', error)
    }

  },
  displayName: 'SignUpForm'
})(SignUpForm);

const styles = StyleSheet.create({
  check: {
    color: colors.green,
    position: 'absolute',
    bottom: 16,
    marginRight: 20,
    right: 1
  },
  error: {
    color: colors.red,
    position: 'absolute',
    bottom: 16,
    marginRight: 20,
    right: 1
  },
  formTitle: {
    color: colors.purpleDark,
    fontSize: 30,
    fontWeight: '500'
  },
  errorText: {
    color: colors.red,
    fontSize: 13,
    marginTop: 3,
    position: 'absolute',
    bottom: -20
  },
  icon: {
    color: colors.green,
    paddingBottom: 25,
    marginLeft: 20
    // marginTop: 70
  },
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1
  },
  formContent: {
    marginHorizontal:20,
    position: 'relative'
  },
  buttonForm: {
    ...buttonPrimary,
    width: 279,
    justifyContent: 'center',
    marginTop: 33
  },
  btnContent: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  policiesTextContent: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    color: colors.purpleDark,
    
  },
  policiesText: {
    fontWeight: '600',
    textDecorationLine: 'underline'
  }
});

function mapStateToProps(state) {
  const {
    auth: { token, hasEmail, signStatus }
  } = state;

  return {
    token,
    hasEmail,
    signStatus
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    { authSignUp }
  )(enhanced)
);

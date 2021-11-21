 /* eslint-disable no-nested-ternary */
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import { withNavigation } from 'react-navigation'
 import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
 import { isEmpty } from 'lodash'
 import { withFormik } from 'formik'
 import { Transition } from 'react-navigation-fluid-transitions'
 import i18n from 'i18next'
 import { withTranslation } from 'react-i18next'

 import { colors, buttonPrimary, buttonText, inputText, inputSection } from '../../libs/styles'
 import { handleHitSlop } from '../../libs/helpers'
 import { resetPassword, successMessage } from '../../actions'
 import { isValidPassword } from '../../libs/validations'
 import Icon from '../../libs/CustomIcon'

 class ResetPassword extends Component {
   errorMessage (touched, error, value) {
     return error ? (
       touched ? (
         <Icon style={styles.error} name='error-mark' size={18} />
       ) : null
     ) : isEmpty(value) ? null : (
       <Icon style={styles.check} name='check-mark' size={18} />
     )
   }

   render () {
     const {
       values,
       touched,
       errors,
       handleChange,
       handleBlur,
       handleSubmit,
       t
     } = this.props

     return (
       <Transition appear='right'>
         <View style={styles.container}>
           <View style={styles.formContent}>
             <Text style={styles.formTitle}>{t('title')}</Text>
             <View style={inputSection}>
               <TextInput
                 onChangeText={handleChange('password')}
                 onBlur={handleBlur('password')}
                 value={values.password}
                 style={inputText}
                 autoCapitalize='none'
                 secureTextEntry
                 placeholder={t('passwordPlaceholder')}
                 placeholderTextColor={colors.greyText}
               />
               {this.errorMessage(touched.password, errors.password, values.password)}
               {errors.password ? (
                 touched.password ? (
                   <Text style={styles.errorText}>{errors.password}</Text>
                 ) : null
               ) : null}
             </View>
             <View style={inputSection}>
               <TextInput
                 onChangeText={handleChange('confirmPassword')}
                 onBlur={handleBlur('confirmPassword')}
                 value={values.confirmPassword}
                 style={inputText}
                 autoCapitalize='none'
                 secureTextEntry
                 placeholder={t('confirmPasswordPlaceholder')}
                 placeholderTextColor={colors.greyText}
               />
               {this.errorMessage(
                 touched.confirmPassword,
                 errors.confirmPassword,
                 values.confirmPassword
               )}
               {errors.confirmPassword ? (
                 touched.confirmPassword ? (
                   <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                 ) : null
               ) : null}
             </View>
           </View>
           <View style={styles.btnContent}>
             <TouchableOpacity
               style={styles.buttonForm} onPress={handleSubmit}
               hitSlop={handleHitSlop(14)}
             >
               <Text style={buttonText}>{t('button')}</Text>
             </TouchableOpacity>
           </View>
         </View>
       </Transition>
     )
   }
 }

 const enhanced = withFormik({
  
   mapPropsToValues: props => {
     const email = props.navigation.getParam('email')
     const code = props.navigation.getParam('code')
     return {
       password: '',
       confirmPassword: '',
       email,
       code
     }
   },
   validate: values => {
     const errors = {}

     if (isEmpty(values.password)) {
       errors.password = i18n.t('resetPassword:validation.emptyPassword')
     } else if (!isValidPassword(values.password)) {
       errors.password = i18n.t('resetPassword:validation.errorPassword')
     }

     if (isEmpty(values.confirmPassword)) {
       errors.confirmPassword = i18n.t('resetPassword:validation.emptyPassword')
     } else if (values.password !== values.confirmPassword) {
       errors.confirmPassword = i18n.t('resetPassword:validation.errorConfirmPassword')
     }

     return errors
   },

   handleSubmit: ({ password, confirmPassword, email, code }, { props }) => {
     props.resetPassword(email, code, password, confirmPassword).then(() => {
       successMessage(i18n.t('resetPassword:submit.success.title'))
       props.navigation.navigate('login')
     })
   },

   displayName: 'ResetPassword'
 })(ResetPassword)

 const styles = StyleSheet.create({
   check: {
     color: colors.green,
     position: 'absolute',
     bottom: 20,
     marginRight: 20,
     right: 1
   },
   error: {
     color: colors.red,
     position: 'absolute',
     bottom: 40,
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
     marginTop: 3,
     position: 'absolute',
     bottom: -20
   },
   container: {
     backgroundColor: '#ffffff',
     justifyContent: 'flex-start',
     position: 'relative',
     flex: 1
   },
   icon: {
     color: colors.green,
     paddingBottom: 25,
     marginLeft: 20,
     marginTop: 70
   },
   formContent: {
     marginLeft: 35
   },
   buttonForm: {
     ...buttonPrimary,
     width: 279,
     justifyContent: 'center',
     marginTop: 58
   },
   btnContent: {
     alignItems: 'center',
     justifyContent: 'center'
   }
 })

 function mapStateToProps (state) {
   const {
     auth: { resetStatus, email }
   } = state
   return {
     resetStatus,
     email
   }
 }

 export default withNavigation(
   connect(
     mapStateToProps,
     { resetPassword }
   )(withTranslation('resetPassword')(enhanced))
 )

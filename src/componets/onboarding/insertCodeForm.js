 /* eslint-disable no-nested-ternary */
 import React, { Component } from 'react'
 import { connect } from 'react-redux'
 import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
 import { withNavigation } from 'react-navigation'
 import { Transition } from 'react-navigation-fluid-transitions'
 import { isEmpty } from 'lodash'
 import { withFormik } from 'formik'
 import i18n from 'i18next'
 import { withTranslation } from 'react-i18next'

 import { retreiveAccessData } from '../../actions'
 import { colors, buttonPrimary, buttonText, inputText, inputSection } from '../../libs/styles'
 import { handleHitSlop } from '../../libs/helpers'
 import { successMessage } from '../../actions/alerts'

 class InsertCode extends Component {

 state = {
    showForgetComponent:false,
    showButtom: false

   }
  
 
   handleTry = ({ props }) =>{
     this.props.navigation.navigate('forgetPassword')
   }
     tryButtom = () => {
         return(
         <View style={styles.btnContent}>
            <TouchableOpacity 
            style={styles.buttonForm}
            onPress={this.handleTry}
                >
               <Text style={buttonText}> Try Again </Text>  
            </TouchableOpacity> 
           </View>
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
       isSubmitting,
       t
     } = this.props

     return (
       <Transition appear='right'>
         <View style={styles.container}>
           <View style={styles.formContent}>
             <Text style={styles.formTitle}>{t('title')}</Text>
             <View style={inputSection}>
               <TextInput
                 onChangeText={handleChange('code')}
                 onBlur={handleBlur('code')}
                 value={values.code}
                 style={inputText}
                 autoCapitalize='none'
                 placeholder={t('codePlaceholder')}
                 placeholderTextColor={colors.greyText}
               />
               {errors.code ? (
                 touched.code ? (
                   <Text style={styles.errorText}>{errors.code}</Text>
                 ) : null
               ) : null}
             </View>
           </View>
           <View style={styles.btnContent}>
             <TouchableOpacity
               style={styles.buttonForm}
               onPress={handleSubmit}
               hitSlop={handleHitSlop(14)}
             >
               <Text style={buttonText}>{t('button')}</Text>
             </TouchableOpacity>
           </View>

           {this.tryButtom()}
           {/* <ForgetPassword
          
          
           /> */}
           {/* <View style={styles.btnContent}>
             <TouchableOpacity
               style={[styles.buttonForm, { backgroundColor: isSubmitting ? '#00eba666' : colors.green }]}
               onPress={handleSubmit}
               hitSlop={handleHitSlop(14)}
               disabled={isSubmitting}
             >
               <Text style={buttonText}>{t('button')}</Text>
             </TouchableOpacity>
           </View> */}
         </View>
       </Transition>
     )
   }
 }

 const enhanced = withFormik({
   mapPropsToValues: props => {
     const email = props.navigation.getParam('email')
     return {
       code: '',
       email
     }
   },
   validate: values => {
     const errors = {}

     if (isEmpty(values.code)) {
       errors.code = i18n.t('insertCode:validation.emptyCode')
     }
     return errors
   },
   handleSubmit: ({ code, email }, { props }) => {
     props.retreiveAccessData(code, email).then(() => {
       successMessage(
         i18n.t('insertCode:submit.success.title'),
         i18n.t('insertCode:submit.success.subtitle')
       )

       props.navigation.navigate('resetPassword', { email, code })
     })
   },

   displayName: 'InsertCode'
 })(InsertCode)

 const styles = StyleSheet.create({
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
     auth: { status }
   } = state

   return state
 }

 export default withNavigation(
   connect(
     mapStateToProps,
     { retreiveAccessData }
   )(withTranslation('insertCode')(enhanced))
 )

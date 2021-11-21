/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import { isEmpty } from 'lodash'
import { withFormik } from 'formik'
import { Transition } from 'react-navigation-fluid-transitions'
import i18n from 'i18next'
import { withTranslation } from 'react-i18next'

import { authPassword, forgotPassword } from '../../actions'
import { colors, buttonPrimary, buttonText, inputText, inputSection } from '../../libs/styles'
import { isEmail } from '../../libs/validations'
import { successMessageCode } from '../../actions/alerts'
import { handleHitSlop } from '../../libs/helpers'

class ForgetPassword extends Component {
  render () {
    const {
      t,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = this.props

    return (
      <Transition appear='right'>
        <View style={styles.container}>
          <View style={styles.formContent}>
            <Text style={styles.formTitle}>{ t('title') }</Text>
            <View style={inputSection}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={inputText}
                emailAddress
                keyboardType='email-address'
                autoCapitalize='none'
                placeholder={t('emailPlaceholder')}
                placeholderTextColor={colors.greyText}
              />
              {errors.email ? (
                touched.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null
              ) : null}
            </View>
          </View>
          <View  style={styles.btnContent}>
            <TouchableOpacity
              style={[styles.buttonForm, { backgroundColor: isSubmitting ? '#00eba666' : colors.green }]}
              onPress={handleSubmit}
              hitSlop={handleHitSlop(14)}
              disabled={isSubmitting}
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
  mapPropsToValues: () => ({
    email: ''
  }),

  validate: values => {
    const errors = {}

    if (isEmpty(values.email)) {
      errors.email = i18n.t('signin:validation:emptyEmail')
    } else if (!isEmail(values.email)) {
      errors.email = i18n.t('signin:validation.errorEmail')
    }

    return errors
  },

  handleSubmit: ({ email }, { props, setSubmitting }) => {
    setSubmitting(true)
    props.forgotPassword(email.toLowerCase()).then(res => {
      const name = res.value.body.full_name
      successMessageCode(i18n.t('forgotPassword:submit.success.title'), i18n.t('forgotPassword:submit.success.subtitle', {name}))
      setSubmitting(false)
      props.navigation.navigate('insertCode', { email })
    })
  },

  displayName: 'ForgetPassword'
})(ForgetPassword)

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
  return {
    status: state.auth.status
  }
}

export default withNavigation(
  connect(
    mapStateToProps,
    { authPassword, forgotPassword }
  )(withTranslation('forgotPassword')(enhanced))
)

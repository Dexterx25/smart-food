import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { buttonText, buttonPrimary,colors } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'

class ButtonField extends Component {
  handleSubmit (onHandleSubmit) {
    onHandleSubmit()
  }

  renderTextButton (status, text) {
    return status === 'pending' ? (
      <ActivityIndicator size='small' color='#ffffff' />
    ) : (
      <Text style={buttonText}>{text}</Text>
    )
  }

  render () {
    const { disabled, onHandleSubmit, status, text, buttonStyles, buttonContainer } = this.props
    return (
      <View style={[styles.btnContent, buttonContainer]}>
        <TouchableOpacity
          underlayColor='#ffffff'
          style={[styles.button, buttonStyles, { opacity: 1 }]}
          onPress={() => this.handleSubmit(onHandleSubmit)}
          disabled={status === 'pending'}
          hitSlop={handleHitSlop(14)}
        >
          {this.renderTextButton(status, text)}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    ...buttonPrimary,
    width: 279,
    marginBottom: 5,
    marginTop: 10,
    backgroundColor:'white',
    borderColor:colors.purple,
    borderWidth:2
  }
})

export default ButtonField

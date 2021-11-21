import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { buttonText, buttonPrimary } from '../../libs/styles'
import { handleHitSlop } from '../../libs/helpers'

class WaitingButton extends Component {
  handleSubmit (onHandleSubmit) {
    onHandleSubmit()
  }

  renderTextButton (minutes, seconds, text) {
     let $minutes = Math.trunc(parseInt(minutes)/60)

     let $seconds = seconds == 0 ? seconds + 1 : seconds
     if($seconds.toString().length == 1){
      $seconds =  0+`${$seconds}`
     } 
    return minutes === 'pending' ? (
      <ActivityIndicator size='small' color='#ffffff' />
    ) : (
       <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', textAlign:'center', paddingHorizontal:1}}>
              <Text style={[buttonText, {paddingBottom:5}]}>{text}</Text>
              <Text style={$minutes < 2 ? [buttonText,{color:'red'}] : [buttonText]}>{`${$minutes}:${$seconds}`}</Text>
      </View>
    )
  }

  render () {


    const {text, minutes, seconds, time, buttonStyles, buttonContainer } = this.props
    return (
      <View style={[styles.btnContent, buttonContainer]}>
        <TouchableOpacity
          underlayColor='#ffffff'
          style={[styles.button, buttonStyles, { opacity: 1 }]}

          disabled={minutes <= 1}
          hitSlop={handleHitSlop(14)}
        >
          {this.renderTextButton(minutes, seconds, text)}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btnContent: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    width: '100%'
  },
  button: {
    ...buttonPrimary,
    width: 300,
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    marginBottom: 5,
    marginTop: 10
  }
})

export default WaitingButton

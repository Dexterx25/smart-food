/* eslint-disable no-shadow */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { withTranslation } from 'react-i18next'
import { colors, buttonPrimary, buttonText, inputText, inputSection } from '../../libs/styles'
import { authSignOut, fecthUser} from '../../actions'
import { handleHitSlop } from '../../libs/helpers'
import Icon from '../../libs/CustomIcon'
import { successMessage } from '../../actions/alerts'
import FastImage from 'react-native-fast-image'
class Settings extends Component {
componentDidMount () {
this.getMyUser()
}
  getMyUser = async ()=>{
    const {fecthUser, auth} = this.props
    try {
      await fecthUser(auth.userId)
  
    } catch (error) {
      console.warn('this is the error-->', error)      
    }    
    
  }
  async handleSignOut () {
    const {
      provider,
      authSignOut,
      deviceId,
      navigation,
      logOutFacebook,
      currentUser,
      auth,
      t
    } = this.props
    console.log('este es el current user', currentUser)
    console.log('este es el auth del User desde', auth)
    try {     
      await authSignOut(auth)
      setTimeout(() => {
        successMessage("Cerrando sección...")
        navigation.navigate('auth')
      }, 800)
    } catch (err) {
      console.warn('Error: ', err)
    }
  }

  handleShowAlert () {
    const { t } = this.props
    Alert.alert(
            "Quires cerrar sección?",
        '',
      [{ text: "Cancelar", style: 'cancel' }, { text: "Confirmar", onPress: () => this.handleSignOut() }],
      { cancelable: false }
    )
  }

  render () {
    const { authStatus, navigation, t, auth} = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ marginTop: isIphoneX() ? 100 : 80 }}>

            <View
              style={{ flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems:'center', textAlign:'center'}}
            >   
              <View style={{width:300, height:300, padding:10, margin:40, justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                
                 <FastImage  source={require('../../imgs/manIndiAvatar.png') }        
                  resizeMode={FastImage.resizeMode.contain}
                  style={{ width: 200, height: 200 }}

                />
            <View style={{flexDirection:'column', margin:40, justifyContent:'space-around', alignItems:'center',  textAlign:'center'}}>
              <Text style={{color:'white',fontSize:16, paddingRight:1}}>{'Usuario:'}</Text>
                 <Text  style={{ color: 'black', fontSize: 17, width: 300, padding:3, alignItems:'center', textAlign:'center'}}>
                   {auth.nikname}
                </Text>
                <Text style={{color:'white',fontSize:16, paddingRight:1, padding:3,}}>{'Email:'}</Text>
                 <Text  style={{ color: 'black', fontSize: 17, width: 300, alignItems:'center', textAlign:'center'}}>
                   {auth.email}
                </Text>
              </View>
            </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.logOutButtom}
                  onPress={() => this.handleShowAlert()}
                  hitSlop={handleHitSlop(14)}
                >
                  {authStatus === 'pending' ? (
                    <ActivityIndicator size='small' color='#ffffff' />
                  ) : (
                    <Text style={styles.logOutLabel}>
                      {'Cerrar seccion'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dac292',
    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 30
  },
  listContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    width: '100%',
    marginBottom: 50,
    paddingBottom: 10,
    marginLeft: 41
  },
  listIcon: {
    marginTop: 0
  },
  ListText: {
    ...inputText,
    flex: 1,
    marginTop: 0,
    paddingBottom: 0,
    marginLeft: 10
  },
  logOutButtom: {
    marginBottom: 60,
    width: 150,
    height: 45,
    backgroundColor:"#ffe3b8",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10
  },
  logOutLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  }
})

function mapStateToProps (state) {
  const {
    auth: {
      status,
      provider,

    },
  
    auth

  } = state

  return {
    authStatus: status,
    provider,
    auth

  }
}

export default withNavigation(
  connect(
    mapStateToProps,
    {
      authSignOut
    }
  )(Settings)
)

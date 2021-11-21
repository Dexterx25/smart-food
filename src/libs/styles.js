import { Platform } from 'react-native'

export const colors = {
  green: '#00EBA6',
  orange: '#FF7D00',
  blue: '#4B6DAD',
  purple: '#502BA0',
  purpleDark: '#302F64',
  yellow: '#F7E100',
  red: '#F81F6C',
  grey: '#D8D8D8',
  greyLight: '#F5F5F5',
  greyText: '#D3D3D7', 
  black: 'black'
}

export const buttonText = {
  fontSize: 16,
  color: 'black',
  textAlign: 'center',
  fontFamily: 'SF Pro Text',
  fontWeight: '700'
}
export const buttonText2 = {
  fontSize: 16,
  color: 'white',
  textAlign: 'center',
  fontFamily: 'SF Pro Text',
  fontWeight: '700'
}
export const buttonTextconfirm ={
  fontSize: 16,
  color: 'white',
  alignItems:'center',
  textAlign: 'center',
  justifyContent:'center',
  // margin:-10,
 marginBottom:10,
 marginTop:10,
  fontFamily: 'SF Pro Text',
  fontWeight: '900'
}
export const buttonBlur = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0,
  shadowRadius: 6.6,
  elevation: 11
}

export const buttonPrimary = {
  backgroundColor: '#ffe3b8',
  paddingTop: 18,
  borderColor: 'black',
  borderWidth: 1,

  paddingBottom: 18,
  fontWeight: '500',
  color:"black",
  fontFamily: 'SF Pro Text',
  borderRadius: 10,
  marginTop: 10,
  marginBottom: 15
}

export const container = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  }
}

export const inputText = {
  paddingBottom: 14,
  fontWeight: '400',
  marginTop: 55,
  fontSize: 16,
  color: colors.purpleDark
}

export const inputSection = {
  width: '100%',
  borderBottomWidth: 2,
  borderBottomColor: colors.purple,
  position: 'relative'
}

export const headerStyle = {
  borderBottomWidth: 0,
  backgroundColor: 'transparent',
  elevation: 0
}

export const headerTitleStyle = {
  color: '#ffffff',
  fontSize: 17,
  fontFamily: 'SF Pro Text',
  fontWeight: '400',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',

}
export const headerTitleStyle2 = {
  color: '#ffffff',
  fontSize: 17,
  fontFamily: 'SF Pro Text',
  fontWeight: '400',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  padding:30,
  paddingTop: Platform.OS === 'ios' ? 0 : 10,
  right: Platform.OS === 'ios' ? 0 : 40
}
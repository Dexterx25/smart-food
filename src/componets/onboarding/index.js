/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import {withTranslation} from 'react-i18next';
import {colors, buttonPrimary, buttonText} from '../../libs/styles';
import {handleHitSlop} from '../../libs/helpers';
import ImageSlider from '../image-slider';
import {
  appleLogin,
  registrationUserWithApple,
  facebookLogin,
  changeLanguage,
  addDevice,
  fecthUser,
  addLocalDevice,
} from '../../actions';
import Icon from '../../libs/CustomIcon';
import Background from '../background';
import ImageIcon from '../icon';
class Onboarding extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const {status, navigation} = this.props;
    console.log('this is the status--->', status);
    if (prevProps !== this.props) {
      if (status === 'success') {
        navigation.navigate('loading');
      }
    }
  }

  render() {
    const {t, navigation} = this.props;
    return (
      <View style={styles.container}>
        <Background />
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: -30,
            }}>
            <ImageIcon
              name={'logoOmbording'}
              height={400}
              width={260}
              style={{justifyContent: 'center', alignItems: 'center'}}
            />
          </View>
          <View style={styles.containerButtons}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                maxWidth: 200,
              }}>
              <View style={[styles.btnContent, {width: 120}]}>
                <View style={[styles.providersContent, {width: 120}]}>
                  <TouchableOpacity
                    style={[styles.appleButton, {backgroundColor: 'blue'}]}
                    color={'#ffffff'}
                    onPress={this.handleFacebookLogin}
                    underlayColor={'#ffffff'}
                    hitSlop={handleHitSlop(14)}>
                    <ImageIcon
                      name={'facebookLoge'}
                      height={40}
                      width={40}
                      style={{justifyContent: 'center', alignItems: 'center'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.btnContent, {width: 130}]}>
                <View style={[styles.providersContent, {width: 130}]}>
                  <TouchableOpacity
                    style={[styles.appleButton, {backgroundColor: '#b22222'}]}
                    color={'#ffffff'}
                    onPress={this.handleFacebookLogin}
                    underlayColor={'#ffffff'}
                    hitSlop={handleHitSlop(14)}>
                    <ImageIcon
                      name={'googleLoge'}
                      height={50}
                      width={40}
                      style={{justifyContent: 'center', alignItems: 'center'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.btnContent}>
              <View style={styles.providersContent}>
                <TouchableOpacity
                  style={styles.appleButton}
                  underlayColor={'#ffffff'}
                  onPress={() => navigation.navigate('login')}
                  hitSlop={handleHitSlop(14)}>
                  <Text style={{...buttonText, color: colors.purple}}>
                    {'INGRESAR'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.btnContent}>
              <View style={styles.providersContent}>
                {
                  <TouchableOpacity
                    style={styles.appleButton}
                    underlayColor={'#ffffff'}
                    onPress={() => navigation.navigate('signUp')}
                    hitSlop={handleHitSlop(14)}>
                    <Text style={{...buttonText, color: colors.purple}}>
                      {'REGISTRARSE'}
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    height: '100%',
  },
  containerButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    marginBottom: 30,
  },
  btnContent: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonContact: {
    ...buttonPrimary,
    width: 279,
    marginBottom: 0,
    marginTop: 0,
  },
  buttonFb: {
    ...buttonPrimary,
    backgroundColor: colors.blue,
    width: 200,
    marginTop: 0,
    marginBottom: 0,
  },
  iconEmail: {
    marginRight: 40,
  },
  icon: {
    marginRight: 40,
    fontSize: 30,
  },
  textContent: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    marginBottom: 50,
  },
  textRef: {
    fontSize: 13,
    color: colors.purpleDark,
    fontWeight: '500',
  },
  providersContent: {
    flexDirection: 'row',
    width: 330,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 26,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 10,
  },
  appleButton: {
    flexDirection: 'row',
    borderColor: colors.purple,
    borderWidth: 2,
    backgroundColor: 'white',
    height: 50,
    fontSize: 60,
    borderStyle: 'solid',
    borderRadius: 10,
    flexBasis: '78%',
    fontWeight: '500',
    fontFamily: 'SF Pro Text',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  facebookButton: {
    flexDirection: 'row',
    borderColor: colors.purple,
    borderWidth: 2,
    backgroundColor: 'white',
    height: 50,
    fontSize: 60,
    borderStyle: 'solid',
    borderRadius: 10,
    flexBasis: '78%',
    fontWeight: '500',
    fontFamily: 'SF Pro Text',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
});

export default Onboarding;

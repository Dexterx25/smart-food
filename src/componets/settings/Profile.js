/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import { isEmpty, values } from 'lodash';
import { withFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from 'i18next'

import { updateUser } from '../../actions';
import { colors, headerTitleStyle } from '../../libs/styles';
import { handleHitSlop } from '../../libs/helpers';
import Icon from '../../libs/CustomIcon';
import { successMessage, errorMessage } from '../../actions/alerts';
import ButtonField from '../../components/button';
import { BackButton } from '../../components/header-buttons';

class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: BackButton(navigation),
    headerRight: <View />,
    headerTransparent: true,
    headerTitleStyle: {
      ...headerTitleStyle,
      color: colors.purpleDark
    }
  });
   
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
    const { handleChange, handleBlur, handleSubmit, navigation, setParams, values, status } = this.props;
    const avatarImage = this.buildImageSource(values.avatar);
   
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <KeyboardAwareScrollView>
            <View>
              <Text style={styles.formTitle}>{i18n.t('editProfile:title')}</Text>
              <View
                style={{ justifyContent: 'center', alignItems: 'center', position: 'relative', marginVertical: 40 }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    transform: [{ translateX: 30 }]
                  }}
                >
                  <FastImage style={styles.profileImage} source={avatarImage} />
                  <TouchableOpacity
                    style={{ transform: [{ translateX: -30 }]}}
                    onPress={() => this.showImagePicker()}
                    hitSlop={handleHitSlop(14)}
                  >
                    <View style={styles.btnContent}>
                      <Icon style={styles.editAvatar} color="#ffffff" name="pencil" size={18} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{i18n.t('editProfile:nameText')}</Text>
                <TextInput
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  style={styles.detailText}
                  placeholder={i18n.t('editProfile:namePlaceholder')}
                  placeholderTextColor={colors.greyText}
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{i18n.t('editProfile:lastNameText')}</Text>
                <TextInput
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  style={styles.detailText}
                  autoCapitalize="none"
                  placeholder={i18n.t('editProfile:lastNamePlaceholder')}
                  placeholderTextColor={colors.greyText}
                />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{i18n.t('editProfile:emailText')}</Text>
                <Text style={styles.detailText}>{values.email}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <ButtonField text={i18n.t('editProfile:button')} onHandleSubmit={handleSubmit} status={status} />
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    position: 'relative',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 67 : 30
  },
  formContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  formTitle: {
    color: colors.purpleDark,
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 40
  },
  btnContent: {
    backgroundColor: colors.purpleDark,
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  editAvatar: {
    fontSize: 18
  },
  detailContent: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginBottom: 40
  },
  detailTitle: {
    color: colors.green,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20
  },
  detailText: {
    color: colors.purpleDark,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20
  },
  profileImage: {
    width: 127,
    height: 127,
    borderRadius: 70,
    backgroundColor: '#D8D8D8'
  }
});

const enhanced = withFormik({
  mapPropsToValues: props => {
    const { avatar, firstName, lastName, email } = props.currentUser;
    return {
      avatar,
      firstName,
      lastName,
      email
    };
  },

  validate: values => {
    const errors = {};
    if (isEmpty(values.firstName)) {
      errors.firstName = i18n.t('editProfile:emptyName')
    }
    if (isEmpty(values.lastName)) {
      errors.lastName = i18n.t('editProfile:emptyLastName')
    }
    return errors;
  },

  handleSubmit: (values, { props, ...formikProps }) => {
    const { auth, users} = props;
    console.log('auth DESDE PROFILE', auth)
    const { firstName, lastName, email, avatar } = values;
    formikProps.setStatus('pending')
    props.updateUser(auth, {firstName, lastName, email, avatar})
      .then(() => {
        formikProps.setStatus('success')
        successMessage(i18n.t('editProfile:submit.success.title'));
      })
      .catch(() => {
        errorMessage(i18n.t('editProfile:submit.error.title'), i18n.t('editProfile:submit.error.subtitle'));
      });
  },

  displayName: 'AddEventForm'
})(Profile);

function mapStateToProps(state) {
  const { status } = state.users;
  const { user_id } = state.auth;
  const {
    users: { currentUser },
    auth
  } = state;

  return {
    userId: user_id,
    status,
    currentUser,
    auth
  };
}

export default connect(
  mapStateToProps,
  { updateUser }
)(enhanced);

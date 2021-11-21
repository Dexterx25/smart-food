/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { withNavigation } from 'react-navigation';
import Logo from '../../imgs/iracaLogo.png';

import {
  fecthUser,
} from '../../actions';


class Loading extends PureComponent {
  state = {
    deviceToken: null
  };

  async componentDidMount() {
    const { language, token, playerId } = this.props;
    this.onAuthComplete(token);
  }

  onAuthComplete(token) {
    const { navigation } = this.props;
    if (token) {
      console.warn('TOKEN TOKEN--->', token)
      navigation.navigate('main');
    } else {
      setTimeout(() => {
        navigation.navigate('auth');
      }, 250);
    }
  }

  render() {
    return (
      <Transition>
        <View style={styles.container}>
          <StatusBar barStyle="default" />
          <Image
            source={Logo}
            style={{
             
              width: 230,
              height: 74,
              padding:100,
              justifyContent: 'center'
            }}
          />
          <ActivityIndicator size="large" color="#302F64" style={{ marginTop: 20 }} />
        </View>
      </Transition>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});

function mapStateToProps(state) {
  const {
    auth,
    auth: { token, hasEmail, userId, status },
  } = state;

  return {
    token,
    auth,
    userId,
    hasEmail,
    status,
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    {
     
      fecthUser,
    }
  )(Loading)
);

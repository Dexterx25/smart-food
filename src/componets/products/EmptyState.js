import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import FastImage from 'react-native-fast-image';
import { withTranslation } from 'react-i18next';

import { colors } from '../../libs/styles';
import empatyState from '../../componets/icon/images/EmpatyState.png';
import arrowDown from '../../componets/icon/images/arrowDown.png'
class EmptyState extends Component {
  

  render() {
    const { t, } = this.props;

    return (
      <Transition delay>
        <View style={styles.container}>
          <FastImage style={styles.image} source={empatyState} resizeMode="contain" />
          <View style={styles.textContent}>
            <Text style={styles.description}>
              {'No Tienes ningun producto aún'}
            </Text>
            <Text style={styles.subTitle}>
              {'Puedes crear el primero en cualquier momento, animate!'}
            </Text>
            <View style={{padding:20}}>
                <Image  source={require('../icon/images/arrowDown.png')} style={{width:50, height:50, borderRadius:100}}/>
            </View>
          </View>
        </View>
      </Transition>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop:'40%',
    width: '100%',
    flexDirection:'column'
  },
  image: {
    width: '80%',
    height: 281,
    borderRadius:700
  },
  iconArrow: {
    marginTop: 20
  },
  textContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    flexDirection:'column'
  },
  description: {
    fontSize: 16,
    color: 'brown',
    marginBottom: 16,
    width: 300,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 16,
     textAlign:'center',
    color: 'brown'
  },
  text: {
    color: '#ffffff',
    justifyContent: 'center'
  },
  iconHeader: {
    color: colors.green
  },
  retryButton: {
    color: '#00EBA6',
    marginTop: 30,
    fontSize: 20
  }
});

export default withTranslation('network')(EmptyState);

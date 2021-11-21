import React, { Component } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions, Animated, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { map } from 'lodash';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { withTranslation } from 'react-i18next'

import { colors } from '../../libs/styles';

import loginImage1 from '../../imgs/Collage.jpeg';
import loginImage2 from '../../imgs/milesFamiliasBeneficiadas4.jpg';
import loginImage3 from '../../imgs/extrategiasDeComercio.png';
import Logo from '../../imgs/NavBarSociosPorColombia.png';

const { width } = Dimensions.get('window');

class ImageSlider extends Component {

  state = {
    photos: [
      {
        image: loginImage1,
        textFirst:  "Hacer algo de manera desinterasada \n es la razón que nos une para prosperar",
      },
      {
        image: loginImage2,
        textFirst: "Miles de familias beneficiadas con nuestra  \n extrategia de comercio para sus productos",
      },
      {
        image: loginImage3,
        textFirst: "Rutas de aprendizaja  y mucho más",
      }
    ]
  }

  scrollX = new Animated.Value(0);
  render() {
    const position = Animated.divide(this.scrollX, width);
    const { photos } = this.state

    return (
      <Transition>
        <View>
          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }])}
            >
              {map(photos, (src, i) => (
                <View key={i}>
                  <Image style={styles.image} source={src.image} />
                  <View style={styles.textContent}>
                    <Text style={styles.subTitle}>
                      {src.textFirst}
                    </Text>
                    <Text style={styles.subTitle}>
                      {src.textSecond}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.pageDots}>
            {photos.map((_, i) => {
              const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    height: 5,
                    width: 5,
                    backgroundColor: '#00EBA6',
                    margin: 3,
                    borderRadius: 5
                  }}
                />
              );
            })}
          </View>
        </View>
      </Transition>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width,
    height: isIphoneX() ? 350 : 300
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    color: colors.purpleDark,
    marginTop: 0,
    textAlign: 'center',
    width: 300
  },
  textContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 65
  },
  pageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: isIphoneX() ? 0 : 0
  }
});

export default ImageSlider

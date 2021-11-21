 import React, { Component } from 'react';
 import FastImage from 'react-native-fast-image';
 import background from '../../imgs/BackGroudOmbording.jpg';

 class Background extends Component {
   render() {
     const { imageBackground } = this.props;

     return (
       <FastImage
         style={{
           flex: 1,
           position: 'absolute',
           width: '100%',
           height: '100%',
           top: 0,
           left: 0,
           justifyContent: 'center'
         }}
         source={imageBackground || background}
         resizeMode="cover"
       />
     );
   }
 }

 export default Background;

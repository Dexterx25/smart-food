 import React, { Component } from 'react';
 import { connect } from 'react-redux';
 import FastImage from 'react-native-fast-image';
 import { View, StyleSheet, Text, ActivityIndicator, Image,
    StatusBar} from 'react-native';
 //import Loader from '../../images/loader.gif';
// import { colors } from '../../libs/styles';
import { Transition } from 'react-navigation-fluid-transitions';

 import Logo from '../../imgs/iracaLogo.png';

 class LoadScreen extends Component {
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
     marginBottom: 0,
     justifyContent: 'center',
     height: '100%',
     width:'100%',
     alignItems: 'center'
   },
   loader: {
     width: 100,
     height: 100
   }
 });

 function mapStateToProps(state) {

 }

 export default connect(mapStateToProps)(LoadScreen);

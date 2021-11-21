/**
 * @flow
 */
import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { createAppContainer } from 'react-navigation';
import initializeInterceptors from './src/libs/interceptor';
import configureStore from './src/store';
import MainNavigator from './src/routes/index';

const { store, persistor } = configureStore();
initializeInterceptors(store);
// persistor.purge();   
// persistor.persist()
export default class App extends Component {
   componentDidMount() {
  
    }

    
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
            <FlashMessage position='top' />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    right: 0,
    left: 0,
    height: '100%'
  }
});

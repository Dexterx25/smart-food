/* eslint-disable no-underscore-dangle */
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;

const resetAction = StackActions.reset({
  index: 0,
  key: null,
  actions: [NavigationActions.navigate({ routeName: 'auth' })]
});

export default {
  navigate,
  setTopLevelNavigator,
  goToTop
};

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  NavigationActions.navigate({
    routeName,
    params
  });
}

function goToTop() {
  _navigator.dispatch(resetAction);
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Dimensions, Keyboard, Text } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { showMessage } from 'react-native-flash-message';
import { isIphoneX } from 'react-native-iphone-x-helper'
import { withTranslation } from 'react-i18next';
import ImageIcon from '../icon'
import { colors } from '../../libs/styles';
import { handleHitSlop } from '../../libs/helpers';
import { errorMessage } from '../../actions/alerts'
import {API_BASE} from '../../libs/http'
import {
 
} from '../../actions';

const { width } = Dimensions.get('window');
const tabWidth = width + 1;

class MainTabBar extends Component {
  state = {
    activeNotification: false,
    isVisible: true,  
  };
   componentDidMount (){
     const {auth} = this.props 
   }
   componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
   
  }
 componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }
  renderNavButton(navigation, onPress, icon, index) {
   
    const { state } = navigation
      const routeName = this.props.navigation.routeName
    const {getNotificationList, notifications, invitations} = this.props
    const isActive = state.index === index
    
    console.warn('thi it the Stat--->', index, state.index, isActive, navigation)
    return (
      <TouchableOpacity
        style={styles.navContent}
        onPress={onPress}
        hitSlop={handleHitSlop(14)}
      >
        <Transition appear="bottom">
          <View style={styles.navItem}>
            { index == 3 ? 
              <ImageIcon
              name={'settingsIcon'}
              height={35}
              width={35}
            />
            : index == 0 ? 
            <ImageIcon
            name={isActive ? 'open_box' : 'close_box'}
            height={35}
            width={35}
          />
            : null
            }

          
          </View>
          
          
        </Transition>
        {
          state.index === index && (<View style={styles.iconBorder} />)
        }
      </TouchableOpacity>
    );
  }
  onNavigationProducts(navigation, online) {
    const { t } = this.props
    if (online) {
      return navigation.navigate('AddProduct');
    }
    return showMessage({
      message: t('conection.message'),
      description: t('conection.description'),
      type: 'default',
      backgroundColor: '#FFF9F9',
      color: '#E9646F',
      floating: true,
    });
  }


  handleNavigation = async (name, onPress, index) => {
    console.warn('THIS IS THE NAME-->', name, "this is the Onpress-->", onPress, "this is the index--->", index)
    const { navigation, t } = this.props
    const { state, routeName} = navigation
    if(typeof onPress === 'function' && state.index !== index) {
      onPress().catch(_ => {
        console.warn('ERROR EN ONPRESS')
        errorMessage('There are a error')
      })
    }
    navigation.navigate(name)
  }

  renderAddButton(navigation) {
    const { offline: { online } } = this.props;
    return (
      <View style={[styles.navContent, { position: 'relative', bottom: 10 }]}>
        <Transition appear="scale" delay>
          <TouchableOpacity
            onPress={() => this.onNavigationProducts(navigation, online)}
            hitSlop={handleHitSlop(14)}
          >
            <ImageIcon
              name='add_product2'
              height={60}
              width={50}
            />
          </TouchableOpacity>
        </Transition>
      </View>
    )
  }


  renderBar = () => {
    const { navigation, getFriends } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tabIconContent}>
          {
            this.renderNavButton(navigation, () => this.handleNavigation('productList'), 'open_box',0)
          }
          
          { this.renderAddButton(navigation) }
          
          {
            this.renderNavButton(navigation, () => this.handleNavigation('settings'), 'settingsIcon', 3)
          }
        </View>
      </View>
    )
  }

  render() {
    if (this.state.isVisible) {
      return this.renderBar()
    }
    return <View />
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: isIphoneX() ? 80 : 63,
    bottom: 10,
    marginBottom: -10,
    width: '100%'
  },
  notificationIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 13,
    left: 10
  },
  navContent: {
    flex: 1,
    alignItems: 'center',
    position: 'relative'
  },
  
  navItem: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabIconContent: {
    flexDirection: 'row',
    width: '100%'
  },
  background: {
    backgroundColor: '#202441',
    height: 40,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 80,
    marginTop: 10,
    width: tabWidth,
    position: 'absolute'
  },
  text: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 2,
    justifyContent: 'center'
  },
  Icon: {
    paddingTop: 15
  },
  addButton: {
    height: 70,
    width: 70,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green
  },
  iconBorder: {
    width: 45,
    height: 3,
    backgroundColor: '#00EBA6',
    borderRadius: 5,
    position: 'relative',
    top: 15
  }
});

function mapStateToProps(state) {
  const { 
    auth,
    offline
  } = state;

  return {
    auth,
    offline
    
  };
}

export default connect(mapStateToProps, {
 
})(MainTabBar)
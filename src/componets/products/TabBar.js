import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'

const TabBar = ({ tabs, activeTab, goToPage, textStyle, ...props }) => {
  return (
    <View style={[styles.container, props.containerStyles]}>
      {
        tabs.map((name, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[styles.button, props.buttonStyles, { backgroundColor: activeTab === i ? '#00EBA6' : 'transparent' }]}
              onPress={() => {
                typeof props.handleTabBar === 'function' && props.handleTabBar(i)
                goToPage(i)
              }}
            >
              <Text style={[styles.textButton, textStyle, { color: activeTab === i ? textStyle.color : '#B3B3B3' }]}>{name}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 150
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    color: '#302F64',
    fontWeight: '900'
  }
})

import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native'

import EmptyState from './EmptyState'
import i18n from 'i18next';

import { colors } from '../../libs/styles'

const SectionItem = (props) => {
  const { title, data, renderItem } = props
  console.warn('DATAS ListProduts--->', data)
  const keyExtractor = item => item.id

  return (
    <View style={(title === 'Mis Productos') && data.length
      ? styles.todayEvents : {
        ...styles.todayEvents,
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent'
      }}
    >
      {
        data.length ? (
          <View >
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        ) : null
      }
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => renderItem(item)}
        ListEmptyComponent={
          <View style={{ flex: 1, }}>
            <Text>{'NADAA'}</Text>
          </View>
        }
      />
    </View>
  )
}

export default SectionItem

const styles = StyleSheet.create({
  todayEvents: {
    borderLeftWidth: 8,
    justifyContent: 'center',
    borderLeftColor: colors.green,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(83, 80, 133)',
    paddingBottom: 4
  },
  headerTitle: {
    fontSize: 20,
    marginTop: 6,
    paddingBottom: 4,
    color: 'white',
    fontWeight: '600'
  }
})

// @flow
import * as React from 'react'
import { Image } from 'react-native'
import definitions from './definitions'

export default function ImageIcon ({ name, height, width, style }) {
  return (
    <Image
      resizeMode='contain'
      source={definitions[name]}
      style={[{ height, width }, style]}
    />
  )
}

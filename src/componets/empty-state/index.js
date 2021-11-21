// import React from 'react'
// import {
//   View,
//   StyleSheet,
//   Text
// } from 'react-native'

// import FastImage from 'react-native-fast-image'
// import { scale } from '../../libs/scale'

// import emptyStateFriend from '../../imgs/empty.png'

// const EmptyState = ({
//   title = '',
//   subTitle = '',
//   source = emptyStateFriend,
//   width = 240,
//   height = 240
// }) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <View style={styles.imageContent}>
//         <FastImage
//           source={source}
//           resizeMode='contain'
//           style={{
//             width: scale(width),
//             height: scale(height)
//           }}
//         />
//       </View>
//       <View style={styles.titleContent}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.subTitle}>{subTitle}</Text>
//       </View>
//     </View>
//   )
// }

// export default EmptyState

// const styles = StyleSheet.create({
//   imageContent: {
//     flexDirection: 'row',
//     justifyContent: 'center'
//   },
//   titleContent: {
//     marginTop: 15,
//     paddingHorizontal: 40
//   },
//   title: {
//     flexBasis: '100%',
//     textAlign: 'center',
//     fontSize: 16,
//     marginTop: 5,
//     color: '#746DA1',
//     fontWeight: '500'
//   },
//   subTitle: {
//     fontSize: 16,
//     marginTop: 10,
//     color: '#B4B0D3',
//     fontWeight: '500',
//     textAlign: 'center'
//   }
// })

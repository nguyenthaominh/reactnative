import { View, Text } from 'react-native'
import React from 'react'
import styles from './headlings.style'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from '../../constants'

const Headlings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Sản phẩm mới</Text>
        <TouchableOpacity>
          <Ionicons name= 'ios-grid' size={24} color={COLORS.primarys} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Headlings
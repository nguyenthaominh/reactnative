import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { SIZES } from '../../constants'
import ProductCardView from './ProductCardView'

const ProductRow = () => {
  const products =[1,2,3,4]
  return (
    <View style={styles.container}>
    <FlatList
    data={products}
    renderItem={({item})=><ProductCardView/>}
    horizontal
    contentContainerStyle={{ columnGap: SIZES.medium }}
    />
    </View>
  );
};
export default ProductRow

const styles = StyleSheet.create({})
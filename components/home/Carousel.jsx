import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';

const Carousel = () => {
  const slides= [
    "https://rcong.vn/wp-content/uploads/2022/10/Tang-1-Khach-bep-lideco-1-edited-1.jpg",
    "https://donggia.vn/wp-content/uploads/2020/12/mau-phong-khach-biet-thu-cao-cap-2022-768x432.jpg",
    "https://metaldecor.vn/noithatmetaldecor_459819w/upload/images/decor-noi-that-la-gi.jpg"

  ]
  return (
    <View styles={styles.carouselContainer}>
      <SliderBox images={slides}
      dotColor={COLORS.primary}
      inactiveDotColor={COLORS.secondary}
      ImageComponentStyle= {{borderRadius:15, width:"93%", marginTop:15 }}
      autoplay
      circleLoop
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  carouselContainer:{
    flex:1,
    alignItems:"center"
  }
})
import { StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import styles from "../../screens/cart.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const OrdersTile = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.favContainer(COLORS.secondary)}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.productId.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.productId.title}
        </Text>
        <Text style={styles.supplya} numberOfLines={1}>
          {item.productId.supplier}
        </Text>
        <Text style={styles.supplya} numberOfLines={1}>
          {item.productId.price}
        </Text>
      </View>
      <View
        style={styles.orders }
      >
      <Text style={styles.productTxt}>{item.payment_status}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default OrdersTile;

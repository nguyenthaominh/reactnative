import { StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import styles from "../../screens/cart.style";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const CartTile = ({ item, onPress, isSelected, onDelete }) => {
  return (
    <TouchableOpacity
      style={styles.favContainer(isSelected ? COLORS.secondary : "#FFF")}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.cartItem.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTxt} numberOfLines={1}>
          {item.cartItem.title}
        </Text>
        <Text style={styles.supplya} numberOfLines={1}>
          {item.cartItem.supplier}
        </Text>
        <Text style={styles.supplya} numberOfLines={1}>
          {item.cartItem.price}*{item.quantity}
        </Text>
      </View>
      <TouchableOpacity
        style={{ paddingBottom: 20, paddingLeft: 75 }}
        onPress={onDelete}
      >
        <AntDesign name="delete" size={18} color={COLORS.red} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default CartTile;

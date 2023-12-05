import { TouchableOpacity, Text, View, Image } from "react-native";
import React from "react";
import styles from "./productCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://rcong.vn/wp-content/uploads/2022/10/Tang-1-Khach-bep-lideco-1-edited-1.jpg",
            }}
            style={styles.image}
          />
        </View>
        <View sytle={styles.details}>
          <Text style={styles.supplier} numberOfLines={1}>
            Productaaaaaaaaaaaaaaaaaa
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            Product
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            $123
          </Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

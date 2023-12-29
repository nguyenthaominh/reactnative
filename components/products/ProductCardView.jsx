import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./productCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AddToCart from "../../hook/AddToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count] = useState(1);
  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      console.log(id);
      if (id !== null) {
        setIsLoggedIn(true);
      } else {
        console.log("user not logged in");
      }
    } catch (error) {}
  };
  const handleCart = () => {
    if (isLoggedIn == false) {
      navigation.navigate("LoginPage");
    } else {
      AddToCart(item._id, count);
      Alert.alert("Đã thêm vào giỏ hàng");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View sytle={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.supplier}
          </Text>
          <Text style={styles.price}>{item.price}đ</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => handleCart()}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

import { TouchableOpacity, Text, View, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import styles from "./productDetail.style";
import { COLORS, SIZES } from "../constants";
import AddToCart from "../hook/AddToCart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(false);
  const getAllKeys = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      console.log("All keys:", keys);
      return keys;
    } catch (error) {
      console.error("Error getting all keys:", error);
    }
  };
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  useEffect(() => {
    checkUser();
    checkFavorites();
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
  const createCheckOut = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const response = await fetch(
        "https://payment-production-3e2d.up.railway.app/stripe/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(token),
          },
          body: JSON.stringify({
            userId: JSON.parse(id),
            cartItems: [
              {
                name: item.title,
                id: item._id,
                price: item.price,
                cartQuantity: count,
              },
            ],
          }),
        }
      );
      const { url } = await response.json();
      setPaymentUrl(url);
    } catch (error) {
      console.error("Error creating checkout:", error.message);
    }
  };
  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders");
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };
  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    const existingItem = await AsyncStorage.getItem(favoritesId);
    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location,
    };
    try {
      getAllKeys();
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};
      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        console.log("deleted");
        setFavorites(false);
        Alert.alert("Đã bỏ yêu thích");
      } else {
        favoritesObj[productId] = productObj;
        console.log("added to favorites");
        setFavorites(true);
        Alert.alert("Đã thêm vào yêu thích");
      }
      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    console.log("data:", isLoggedIn);
    if (isLoggedIn === false) {
      navigation.navigate("LoginPage");
    } else {
      addToFavorites();
    }
  };

  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate("LoginPage");
    } else {
      createCheckOut();
    }
  };
  const handleCart = () => {
    if (isLoggedIn == false) {
      navigation.navigate("LoginPage");
    } else {
      AddToCart(item._id, count);
      Alert.alert("Đã thêm vào giỏ hàng");
    }
  };

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem("id");
    const favoritesId = `favorites${JSON.parse(id)}`;
    console.log(favoritesId);
    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);
        if (favorites[item._id]) {
          setFavorites(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Text>{console.log("ttdetail:", paymentUrl)}</Text>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (
        <View>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress()}>
              <Ionicons
                name={favorites ? "heart" : "heart-outline"}
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.details}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.price}>{item.price}đ</Text>
              </View>
            </View>
            <View style={styles.ratingRow}>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <Ionicons key={index} name="star" size={24} color="gold" />
                ))}

                <Text style={styles.ratingText}> (4.9)</Text>
              </View>
              <View style={styles.rating}>
                <TouchableOpacity onPress={() => decrement()}>
                  <SimpleLineIcons name="minus" size={20} />
                </TouchableOpacity>
                <Text style={styles.ratingText}> {count} </Text>
                <TouchableOpacity onPress={() => increment()}>
                  <SimpleLineIcons name="plus" size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionWraper}>
              <Text style={styles.description}> Mô tả</Text>
              <Text style={styles.descText}>{item.description}</Text>
              <View style={{ marginBottom: SIZES.small }}>
                <View style={styles.location}>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location-outline" size={20} />
                    <Text>{item.product_location}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <MaterialCommunityIcons
                      name="truck-delivery-outline"
                      size={20}
                    />
                    <Text>Free Delivery</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => handleBuy()}
                  style={styles.cartBtn}
                >
                  <Text style={styles.carTitle}>MUA NGAY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCart()}
                  style={styles.addCart}
                >
                  <Fontisto
                    name="shopping-bag"
                    size={22}
                    color={COLORS.lightWhite}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

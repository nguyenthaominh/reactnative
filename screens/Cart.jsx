import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import CartTile from "../components/cart/cartTile";
import fetchCart from "../hook/fetchCart";
import { Button } from "../components";
import useDeleteCartItem from "../hook/useDeleteCartItem"; // Import the new hook
import { ScrollView } from "react-native-gesture-handler";

const Cart = ({ navigation }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // const [selected, setSelected] = useState(null);
  // const [select, setSelect] = useState(false);
  // console.log(select);
  const {
    deleteCartItem,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteCartItem(); // Use the new hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCart();
        setCartData(data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      for (const item of selectedItems) {
        total += item.cartItem.price * item.quantity;
      }
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedItems]);

  console.log("Cart Data:", cartData);
  const handleItemPress = (item) => {
    // Toggle selection for the pressed item
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== item
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
  const deleteProduct = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      // You may want to refetch the cart data here after deletion
      const updatedCartData = await fetchCart();
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const countItemsInCart = () => {
    return cartData.length;
  };

  const handleCheckoutPress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const id = await AsyncStorage.getItem("id");
      const updatedCartData = await fetchCart();
      console.log("Tt111", updatedCartData);
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
            cartItems: selectedItems.map((item) => ({
              name: item.cartItem.title,
              id: item.cartItem._id,
              price: item.cartItem.price,
              cartQuantity: item.quantity,
            })),
          }),
        }
      );
      console.log("dulieu", cartData);
      const { url } = await response.json();
      setPaymentUrl(url);
    } catch (error) {
      console.error("Error creating checkout:", error.message);
    }
  };

  const updateCartData = async () => {
    try {
      // Assuming deleteCartItem returns a Promise
      await Promise.all(
        selectedItems.map(async (item) => {
          await deleteCartItem(item._id); // Assuming _id is the unique identifier for items
        })
      );
      const updatedCartData = await fetchCart();
      setCartData(updatedCartData);
    } catch (error) {
      console.error("Error updating and deleting products:", error);
    }
  };
  useEffect(() => {
    if (paymentSuccess) {
      navigation.navigate("Orders");
    }
  }, [paymentSuccess]);
  const handlePaymentSuccess = () => {
    Alert.alert("Thanh toán thành công");
    updateCartData();
    setPaymentSuccess(true); // Assuming you have a state variable
  };
  console.log("sauthanhtoan2", cartData);
  const onNavigationStateChange = async (webViewState) => {
    const { url } = webViewState;
    if (url && url.includes("checkout-success")) {
      Alert.alert("Thanh toán thành công");
      handlePaymentSuccess();
    } else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  };
  {
    /* navigation.replace("Checkout",{paymentUrl}) */
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {paymentUrl ? (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={onNavigationStateChange}
          // style={{ flex: 1, backgroundColor: "yellow" }}
        />
      ) : (
        <View>
          <View style={styles.titleRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Bottom Navigation")}
            >
              <Ionicons
                name="chevron-back-circle"
                size={30}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <Text style={styles.titletxt}>Giỏ hàng </Text>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={cartData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <CartTile
                  item={item}
                  onPress={() => handleItemPress(item)}
                  isSelected={selectedItems.includes(item)}
                  onDelete={() => deleteProduct(item._id)}
                />
              )}
            />
          )}
          <View style={styles.footer}>
            <Text style={styles.totalText}>Tổng cộng: {totalPrice}đ</Text>
            {selectedItems.length > 0 ? (
              <Button
                title={"Thanh toán"}
                isValid={true}
                onPress={handleCheckoutPress}
              />
            ) : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

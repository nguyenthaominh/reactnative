import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cart.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import CartTile from "../components/cart/cartTile";
import fetchCart from "../hook/fetchCart";
import { Button } from "../components";
import useDeleteCartItem from '../hook/useDeleteCartItem'; // Import the new hook



const Cart = ({ navigation }) => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
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
      console.error('Error deleting product:', error);
    }
  };

  const handleCheckoutPress = () => {
    // Handle the checkout logic for selectedItems
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      {selectedItems.length > 0 ? (
        <Button
          title={"Thanh toán"}
          isValid={true}
          onPress={handleCheckoutPress}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Cart;

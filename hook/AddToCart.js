import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddToCart = async (productId, quantity) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://192.168.1.7:3000/api/cart";
    console.log(token);
    const data = {
      cartItem: productId,
      quantity: quantity,
    };
    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };
    console.log("Request Data:", data);
    await axios.post(endpoint, data, { headers });
  } catch (error) {
    throw new Error(error.message);
  }
};
export default AddToCart;

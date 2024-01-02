import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchCart = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = "http://172.16.8.36:3000/api/cart/find";
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };
      const response = await axios.get(endpoint, { headers });
      const newData = JSON.stringify(response.data);
      const parseData = JSON.parse(newData);
      const products = parseData[0].products;
      await AsyncStorage.setItem("cartCount", JSON.stringify(products.length));

      resolve(products);
    } catch (error) {
      reject(error);
    }
  });
};
export default fetchCart;

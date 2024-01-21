import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDeleteCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCartItem = async (itemId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const endpoint = `http://192.168.1.7:3000/api/cart/${itemId}`;
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      await axios.delete(endpoint, { headers });
    } catch (deleteError) {
      setError(deleteError);
    } finally {
      setLoading(false);
    }
  };

  return { deleteCartItem, loading, error };
};

export default useDeleteCartItem;

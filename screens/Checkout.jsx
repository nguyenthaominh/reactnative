import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

const onNavigationStateChange = (webViewState) => {
  const { url } = webViewState;
  if (url && url.includes("checkout-success")) {
    navigation.navigate("Orders");
  } else if (url && url.includes("cancel")) {
    navigation.goBack();
  }
};
const Checkout = ({ navigation,route }) => {
  const { paymentUrl } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default Checkout;


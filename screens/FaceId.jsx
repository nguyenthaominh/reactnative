import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import * as AppleAuthentication from "expo-apple-authentication";
import { View, Text, StyleSheet } from "react-native";
import { Alert } from "react-native";
import styles1 from "./cart.style";
const FaceId = ({ navigation }) => {
  return (
    <SafeAreaView style={styles1.container}>
      <View style={styles1.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles1.titletxt}>Xác thực FaceId</Text>
      </View>
      <View>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              navigation.replace("Bottom Navigation");
            } catch (e) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                Alert.alert("Đăng nhập thất bại");
              } else {
                Alert.alert("Đăng nhập thất bại");
              }
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
});

export default FaceId;

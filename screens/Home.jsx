import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import styles from "./home.style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Welcome from "../components/home/Welcome";
import Carousel from "../components/home/Carousel";
import Headlings from "../components/home/Headlings";
import ProductRow from "../components/products/ProductRow";

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />

          <Text style={styles.location}> Hồ Chí Minh, Việt Nam</Text>

          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}> 8 </Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome/>
        <Carousel/>
        <Headlings/>
        <ProductRow/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

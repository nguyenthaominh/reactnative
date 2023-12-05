import { View, Text } from "react-native";
import React from "react";
import styles from "./welcome.styles";
import { COLORS, SIZES } from "../../constants";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title1}>{"    "}Không Gian Tinh Tế </Text>
        {/* <Text style={styles.welcomeTxt(COLORS.black, SIZES.xxSmall)}>
          {" "}
          Tổ ấm của người tinh tế
        </Text> */}
        <Text style={styles.title2}>{"   "}Nội Thất Nhà Xinh </Text>
        {/* <Text style={styles.welcomeTxt(COLORS.primary, 0)}>
          {" "}
          Nội thất nhà xinh
        </Text> */}
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => navigation.navigate("Search")}
            placeholder="Bạn đang tìm gì?"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

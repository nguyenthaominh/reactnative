import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import style from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExistingUser();
  }, []);
  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
      } else {
        navigation.navigate("LoginPage");
      }
    } catch (error) {
      console.log("Error retrieving the data:", error);
    }
  };
  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.log("Error loggin out the user:", error);
    }
  };
  const logout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        onPress: () => console.log("Hủy thao tác"),
      },
      {
        text: "Chắc chắn",
        onPress: () => userLogout(),
      },
      { defaultIndex: 1 },
    ]);
  };
  const clearCache = () => {
    Alert.alert(
      "Xóa Cache",
      "Bạn có chắc chắn muốn xóa tất cả dữ liệu đã lưu trên thiết bị?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy thao tác"),
        },
        {
          text: "Chắc chắn",
          onPress: () => console.log("Đăng xuất"),
        },
        { defaultIndex: 1 },
      ]
    );
  };
  const deleteAccount = () => {
    Alert.alert(
      "Xóa tài khoản",
      "Bạn có chắc chắn muốn xóa tài khoản của bạn?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy thao tác"),
        },
        {
          text: "Chắc chắn",
          onPress: () => console.log("Đăng xuất"),
        },
        { defaultIndex: 1 },
      ]
    );
  };
  return (
    <View style={style.container}>
      <View style={style.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/space.jpg")}
            style={style.cover}
          />
        </View>
        <View style={style.profileContainer}>
          <Image
            source={require("../assets/images/user.png")}
            style={style.profile}
          />
          <Text style={style.name}>
            {userLogin === true
              ? userData.username
              : "Mời bạn đăng nhập tài khoản"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <View style={style.loginBtn}>
                <Text style={style.menuText}>ĐĂNG NHẬP </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={style.loginBtn}>
              <Text style={style.menuText}>{userData.email}</Text>
            </View>
          )}
          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={style.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favorites")}
              >
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Yêu thích</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Đơn đặt hàng</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={style.menuItem(0.2)}>
                  <SimpleLineIcons
                    name="bag"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Giỏ hàng</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Notify")}>
                <View style={style.menuItem(0.2)}>
                  <AntDesign name="bells" color={COLORS.primary} size={24} />
                  <Text style={style.menuText}>Thông báo</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("FaceId")}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="face-man"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Xác thực FaceId</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="map"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Xem bản đồ</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => navigation.navigate("Health")}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-circle"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Theo dõi sức khỏe</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => navigation.navigate("Ads")}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="advertisements"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Xem quảng cáo</Text>
                </View>
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => clearCache()}>
                <View style={style.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Xóa Cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={style.menuItem(0.2)}>
                  <AntDesign
                    name="deleteuser"
                    color={COLORS.primary}
                    size={24}
                  />
                  <Text style={style.menuText}>Xóa tài khoản</Text>
                </View>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => logout()}>
                <View style={style.menuItem(0.2)}>
                  <AntDesign name="logout" color={COLORS.primary} size={24} />
                  <Text style={style.menuText}>Đăng xuất</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Profile;

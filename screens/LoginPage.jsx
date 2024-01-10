import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./login.style";
import { Button, BackBtn } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Mật khẩu ít nhất phải 6 ký tự")
    .required("Required"),
  email: Yup.string().email("Nhập địa chỉ email").required("Required"),
});

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(false);

  const inValidForm = () => {
    Alert.alert("Đăng nhập thất bại", "Mời bạn thử lại", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel"),
      },
      {
        text: "Continue",
        onPress: () => {},
      },
      { defaultIndex: 1 },
    ]);
  };
  const login = async (values) => {
    setLoader(true);
    try {
      const endpoint = `http://192.168.1.8:3000/api/login`;
      const data = values;
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        setResponseData(response.data);
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
        );
        await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
        await AsyncStorage.setItem("token", JSON.stringify(responseData.token));
        navigation.replace("Bottom Navigation");
      } else {
        Alert.alert(
          "Error Logging In ",
          "Please provide valid required credentials",
          [
            {
              text: "Cancel",
              onPress: () => console.log("cancel"),
            },
            {
              text: "Continue",
              onPress: () => {},
            },
            { defaultIndex: 1 },
          ]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Oops, Lỗi đăng nhập mời thử lại", [
        {
          text: "Cancel",
          onPress: () => console.log(error),
        },
        {
          text: "Continue",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Kính chào quý khách!</Text>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder=" Nhập email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Mật khẩu</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder=" Nhập mật khẩu"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  loader={loader}
                  title={"ĐĂNG NHẬP"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate("SingUp");
                  }}
                >
                  {" "}
                  Đăng Ký
                </Text>
              </View>
            )}
          </Formik>
          <View style={styles1.container}>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={styles1.button}
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
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    width: 200,
    height: 44,
  },
});
export default LoginPage;

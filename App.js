import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  Cart,
  ProductDetails,
  NewRivals,
  LoginPage,
  Orders,
  Favorites,
  SingUp,
  Notify,
  FaceId,
  Ads,
  Map,
  Health,
  LocationFit,
  Checkout
} from "./screens";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={NewRivals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingUp"
          component={SingUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaceId"
          component={FaceId}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ads"
          component={Ads}
          options={{ headerShown: false }}
        />
            <Stack.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Health"
          component={Health}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationFit"
          component={LocationFit}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

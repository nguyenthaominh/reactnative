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
import { OrdersTile } from "../components";
import styles1 from "./cart.style";
import WebView from "react-native-webview";
import { StyleSheet } from "react-native";

const Health = ({ navigation }) => {
  return (
    //  <SafeAreaView style={styles1.container}>
    //     <View style={styles1.titleRow}>
    //       <TouchableOpacity onPress={() => navigation.goBack()}>
    //         <Ionicons
    //           name="chevron-back-circle"
    //           size={30}
    //           color={COLORS.primary}
    //         />
    //       </TouchableOpacity>
    //       <Text style={styles1.titletxt}>Theo dõi sức khỏe</Text>
    //     </View>

    //  </SafeAreaView>
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://checkout.stripe.com/c/pay/cs_test_a1phMDQ7N7wp3xYV9B5zIWDaxNPvVND3zJQQX7EagIFezn66yvZ0UBcbvZ#fidkdWxOYHwnPyd1blpxYHZxWjA0SldydkNMMmZKZGwxQkk2YUtyUmRScHRtczBTYlUyR1dMPWxUQWdfPDVTMEJOPUFuUXFtU0dhT0B8QGZJdGprSWl9TmpSSVE1cGhSRlF8fDc1SHJ8fFVHNTVndXVxXUpdaicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl",
        }}
        style={styles.video}
      />
      <WebView
        source={{ uri: "https://www.youtube.com/embed/PGUMRVowdv8" }}
        style={styles.video}
      />
    </View>
  );
};

export default Health;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1,
  },
});

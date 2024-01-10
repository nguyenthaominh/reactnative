import {
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles1 from "./cart.style";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

const Map = ({ navigation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  useEffect(() => {
    const fetchLocation = async () => {
      // Lấy vị trí hiện tại của thiết bị
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("Vi tri:", longitude);
      // Cập nhật vị trí ban đầu và vị trí của Marker
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      setMarkerPosition({ latitude, longitude });
      console.log("Vi tri3:", initialRegion);
    };
    fetchLocation();
  }, []);
  useEffect(() => {
    console.log("Vi tri4:", initialRegion);
  }, [initialRegion]);
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerPosition(coordinate);
  };
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
        <Text style={styles1.titletxt}>Bản đồ</Text>
      </View>
      <View>
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          region={initialRegion}
          onMapReady={() => console.log("Map is ready")}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              title="Vị trí hiện tại"
              description="Đây là vị trí của bạn"
              pinColor={COLORS.green}
            />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;

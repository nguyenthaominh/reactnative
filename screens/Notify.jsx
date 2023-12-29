import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import styles from "./favorites.style";
import { COLORS } from "../constants";
import { Text, View, Button, Platform, Image } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notify = ({ navigation }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Xóa tất cả các thông báo đã lên lịch hiện tại
    cancelAllScheduledNotifications();
    schedulePushNotification();
  }, []);
  const cancelAllScheduledNotifications = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Tất cả các thông báo đã được hủy lịch.");
    } catch (error) {
      console.error("Lỗi khi hủy lịch tất cả thông báo:", error);
    }
  };

  // useEffect(() => {
  //   const registerForPushNotifications = async () => {
  //     try {
  //       const token = await registerForPushNotificationsAsync();
  //       setExpoPushToken(token);
  //     } catch (error) {
  //       console.error("Error registering for push notifications:", error);
  //     }
  //   };

  //   registerForPushNotifications();

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  useEffect(() => {
    return () => {
      // Clear the notification state when the component unmounts
      setNotification(null);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Thông báo</Text>
      </View>
      <View style={styles.notificationContainer}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={styles.notificationContent}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Click"
          onPress={async () => {
            await  cancelAllScheduledNotifications();
            await schedulePushNotification();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
async function schedulePushNotification() {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Bạn có thông báo mới 📬",
        body: "Sản phẩm giảm giá 50%",
        data: { data: "goes here" },
      },
      // trigger: { seconds: 60*2,
      //    repeats: true},
      trigger: {
        seconds: 2,
      },
    });
    console.log("Thông báo đã được đặt lịch.");
  } catch (error) {
    console.error("Lỗi khi đặt lịch thông báo:", error);
  }

  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     // Learn more about projectId:
  //     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
  //     token = (
  //       await Notifications.getExpoPushTokenAsync({
  //         projectId: "your-project-id",
  //       })
  //     ).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   return token;
  // }
}

export default Notify;

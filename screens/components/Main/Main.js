import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from "react-native";
import Navigation from "../Navigation/Navigation";
import { StatusBar } from "expo-status-bar";
import Banner from "../Banner/Banner";
import * as Notifications from "expo-notifications";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import IntakeProgress from "../IntakeProgress/IntakeProgress";
import { useSelector } from "react-redux";

function Main() {
  const [initialCapacity, setInitialCapacity] = useState(100);
  const [currentUsage, setCurrentUsage] = useState(10);
  const [percentageLeft, setPercentageLeft] = useState(100);

  useEffect(() => {
    // Request notification permission when the component mounts
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const sendNotification = async () => {
    const left = initialCapacity - currentUsage;
    const percentage = (left / initialCapacity) * 100;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Capacity Update",
        body: `You have ${percentage.toFixed(2)}% water left.`,
        data: { percentageLeft },
      },
      trigger: null, // Send it immediately
    });

    console.log("Notification sent:", percentage.toFixed(2)); // Debug statement
  };

  const handleFillCapacity = () => {
    console.log("Filling capacity..."); // Debug statement
    setCurrentUsage(initialCapacity);
    sendNotification(); // Notify the user
    Alert.alert("Your intake capacity has been updated!"); // Alert to confirm action
  };

  // redux
  const theme = useSelector((state) => state.counter.theme);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: `#${theme}` }}>
      <ScrollView>
        {/* navigation */}
        <View style={{ marginTop: 20 }}>
          <Navigation />
        </View>

        {/* banner components here */}
        <View>
          <View style={styles.bannerTxT}>
            <Text style={styles.bannerinnerTxT}>
              <SimpleLineIcons name="drop" size={30} color="grey" /> Keep
              Hydrate Yourself
            </Text>
            <Pressable onPress={handleFillCapacity}>
              <Text>Fill Intake Capacity</Text>
            </Pressable>
          </View>
          {/* banner sections */}
          <Banner />
          {/* intake progress sections */}
          <IntakeProgress />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  bannerTxT: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  bannerinnerTxT: {
    fontSize: 22,
    fontWeight: "300",
    color: "grey",
  },
});

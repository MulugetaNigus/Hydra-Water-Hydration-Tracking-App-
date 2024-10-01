import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Modal,
  TextInput,
  Alert,
  Image,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// icons
import Fontisto from "@expo/vector-icons/Fontisto";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux
import { AddIntakeWater } from "../../../Features/WaterSlice/WaterSlice";
import Notify from "../Notification/Notify";

// notification
import { useNotification } from "../NotificationProvider/NotificationProvider";
import { sendPushNotification } from "../Notification/Notify";

// redux
import { useSelector, useDispatch } from "react-redux";

function Banner() {
  const [modalVisible, setModalVisible] = useState(false);
  const [waterGoal, setWaterGoal] = useState("");
  const opacity = useRef(new Animated.Value(1)).current;
  const dispatch = useDispatch();
  const { expoPushToken } = useNotification();
  const IntakeWater = useSelector((state) => state.counter.value);

  useEffect(() => {
    const startBlinking = () => {
      opacity.setValue(1);
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0, // Fade out
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1, // Fade in
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => startBlinking());
    };

    startBlinking();
  }, [opacity]);

  // Function to send initial notification and set interval for reminders
  const handleAddGoal = () => {
    if (waterGoal) {
      Alert.alert(
        "Success",
        `Your daily water intake goal is set to ${waterGoal} ml! Start your first step!`,
        [
          {
            text: "OK",
            onPress: () => {
              handleSaveMl();
              sendInitialNotification(); // Send initial notification
              startReminderNotification(); // Start reminder notifications
            },
          },
        ]
      );
      setWaterGoal("");
    } else {
      Alert.alert("Error", "Please enter a valid water intake amount.");
    }
  };

  const sendInitialNotification = async () => {
    await sendPushNotification(
      expoPushToken,
      "Goal Set!",
      `Your water intake goal is ${waterGoal} ml.`
    );
  };

  const startReminderNotification = () => {
    setInterval(async () => {
      await sendPushNotification(
        expoPushToken,
        "Reminder",
        "Time to drink water! Keep hydrated!"
      );
    // }, 30 * 60 * 1000); // Every 30 minutes
    }, 3000); // Every 30 minutes
  };

  // add and save the water in ml fun
  const handleSaveMl = () => {
    dispatch(AddIntakeWater(waterGoal));
  };

  return (
    <View style={styles.bannerContainer}>
      <View style={styles.leftSide}>
        <Text style={styles.timeText}>
          <Fontisto name="date" size={20} color="grey" />
          {"  "}
          {new Date().toLocaleDateString()}
        </Text>
        <Text style={styles.infoText}>2000 ml water (2 Glass)</Text>
        <Pressable
          android_ripple={{ color: "lightblue" }}
          onPress={() => setModalVisible(true)}
          style={styles.addGoalButton}
        >
          <Text style={styles.addGoalButtonText} className="font-normal">
            Add your goal
          </Text>
        </Pressable>
        {/* notify start */}
        {/* <Notify /> */}
        {/* notify end */}
      </View>
      <View style={styles.rightSide}>
        <Animated.Image
          source={require("../../../assets/water-drop.png")}
          style={[styles.image, { opacity }]}
          resizeMode="contain"
        />
      </View>

      {/* Modal for Adding Water Intake Goal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              <Image
                source={require("../../../assets/water-drop.png")}
                style={{ width: 40, height: 40 }}
              />
              Water Intake Amount
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount in ml"
              keyboardType="numeric"
              value={waterGoal}
              onChangeText={setWaterGoal}
            />
            <Pressable style={styles.confirmButton} onPress={handleAddGoal}>
              <Text style={styles.btnTxt}>Add</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnTxt}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  leftSide: {
    flex: 1,
    alignItems: "flex-start",
  },
  rightSide: {
    flex: 1,
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "grey",
  },
  infoText: {
    color: "grey",
    opacity: 0.9,
    fontSize: 16,
    marginVertical: 15,
    fontWeight: "400",
  },
  image: {
    width: 140,
    height: 150,
  },
  addGoalButton: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    marginLeft: -10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "normal",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    fontWeight: "500",
    color: "grey",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Banner;

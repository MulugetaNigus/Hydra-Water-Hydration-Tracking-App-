import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

// navigation lib here
import { useNavigation } from "@react-navigation/native";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

function Setting() {
  const [userusername, setuserusername] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const getUserusername = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const { username, password } = JSON.parse(user);
      setuserusername(username);
      setUsername(username);
      setPassword(password);
    }
  };

  useEffect(() => {
    getUserusername();
  }, []);

  const handleLogout = () => {
    Alert.alert("Alert", "Are you sure you want to logout?", [
      { text: "Okay", onPress: () => navigation.navigate("SignIn") },
      { text: "Cancel", onPress: () => null },
    ]);
  };

  const handleUpdate = async () => {
    const updatedUser = { username, password };
    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    setModalVisible(false);
    setuserusername(username); // Update the displayed username
    // Add confirmation alert
    Alert.alert("Success", "Your profile has been updated successfully!", [
      { text: "OK", onPress: () => console.log("Profile updated") },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={{ flexGrow: 1 }}>
        <View>
          <View style={styles.profileSection}>
            <Image
              // source={{
              //   uri: "https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?w=182&h=190&c=7&r=0&o=5&pid=1.7",
              // }}
              source={require("../../../assets/water-drop.png")}
              style={styles.avatar}
            />
            <Text style={styles.username}>HI, {userusername}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statisticsSection}>
            <Text style={styles.statisticText}>Water Intake: 2.5L</Text>
            <Text style={styles.statisticText}>Days Tracked: 30</Text>
            <Text style={styles.statisticText}>Current Streak: 7 Days</Text>
          </View>
        </View>
        <View style={styles.btncontainer}>
          <Pressable
            style={styles.logoutbtncontainer}
            android_ripple={{ color: "white" }}
            onPress={handleLogout}
          >
            <Text style={styles.btnTxt}>Logout</Text>
          </Pressable>
        </View>

        {/* Edit Profile Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? "eye" : "eye-slash"}
                    size={20}
                    color="gray"
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
              <Pressable style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.btnTxt}>Update</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E0F7FA",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: "#007BFF",
    borderRadius: 50,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  statisticsSection: {
    padding: 20,
    margin: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  statisticText: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
    color: "grey",
  },
  btncontainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logoutbtncontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ff751a",
    borderRadius: 5,
    padding: 16,
    margin: 10,
    backgroundColor: "#ff751a",
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "transparent", // Hide inner border in input
    paddingHorizontal: 10,
    borderRadius: 5, // Ensure it uses the same rounded corners
  },
  eyeIcon: {
    marginLeft: 10,
    padding: 10, // Add padding for better tap area
  },
  updateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
});

export default Setting;

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  Alert,
} from "react-native";

// icons
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

// async
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux function here
import { useDispatch } from "react-redux";
import { ChangeTheme } from "../../../Features/WaterSlice/WaterSlice";

const Navigation = () => {
  const [userusername, setuserusername] = useState("");
  const [lightTheme, setlightTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const dispatch = useDispatch();

  // getting username when the page is loaded
  const getUserusername = async () => {
    await AsyncStorage.getItem("user").then((values) => {
      setuserusername(JSON.parse(values).username);
    });
  };

  useEffect(() => {
    getUserusername();
  }, [AsyncStorage.getItem("user")]);

  // dark mode logic
  const DarkMode1 = () => {
    setlightTheme(!lightTheme);
    dispatch(ChangeTheme("262626"));
  };

  const DarkMode2 = () => {
    setlightTheme(!lightTheme);
    dispatch(ChangeTheme("E0F7FA"));
  };

  const handleHowItsWork = () => {
    setModalVisible(true);
  };

  // open the modal when the screens load
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="lightblue" />
      {/* main view */}
      <View style={styles.container}>
        {/* user info */}
        <View style={styles.profile}>
          {/* profile pic */}
          <View>
            <Image
              source={require("../../../assets/water-drop.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
          </View>
          {/* user name */}
          <View style={styles.userInfo}>
            <Text style={styles.welcomeTxt}>Good Morning</Text>
            <Text style={styles.userEmail}>Hello, {userusername}</Text>
          </View>
        </View>

        {/* dark mode controller */}
        <View style={styles.darkModeController}>
          {lightTheme ? (
            <Entypo
              name="light-up"
              size={24}
              color="grey"
              onPress={() => DarkMode1()}
            />
          ) : (
            <Feather
              name="moon"
              size={24}
              color="grey"
              onPress={() => DarkMode2()}
            />
          )}
          <AntDesign
            name="exclamationcircleo"
            size={22}
            color="red"
            onPress={handleHowItsWork}
          />
        </View>
      </View>

      {/* Modal for information */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Important Information !</Text>
            <Text style={styles.modalMessage}>
              Please do not close the app, as notifications may not be addressed
              if you do. Minimize the app !
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Understand !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "lightblue",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    alignSelf: "flex-start",
  },
  userInfo: {
    flexDirection: "column",
  },
  welcomeTxt: {
    fontWeight: "500",
    fontSize: 14,
    color: "grey",
    opacity: 0.7,
  },
  darkModeController: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: 18,
  },
  userEmail: {
    fontWeight: "500",
    color: "grey",
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  modalTitle: {
    fontSize: 25,
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Navigation;

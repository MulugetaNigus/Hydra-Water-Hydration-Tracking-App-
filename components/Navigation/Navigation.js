import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

// redux funtion here
import { useDispatch } from "react-redux";
import { ChangeTheme } from "../../Features/WaterSlice/WaterSlice";

const Navigation = () => {
  const [userusername, setuserusername] = useState("");
  const [lightTheme, setlightTheme] = useState(false);
  const [darkTheme, setdarkTheme] = useState(false);
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

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="lightblue" />
      {/* main view */}
      <View style={styles.container}>
        {/* user info */}
        <View style={styles.profile}>
          {/* profile pic */}
          <View>
            {/* profile pic */}
            <Image
              source={require("../../assets/water-drop.png")}
              resizeMode="contain"
              style={{ width: 40, height: 40, borderRadius: 100 }}
            />
            {/* <FontAwesome5 name="user" size={23} color="black" /> */}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // marginHorizontal: -15,
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
  },
  userEmail: {
    fontWeight: "500",
    color: "grey",
    fontSize: 22,
  },
});

export default Navigation;

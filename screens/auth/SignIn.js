import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";

// navigation hooks
import { useNavigation } from "@react-navigation/native";

// icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";

// async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignIn() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // navigation hook
  const navigate = useNavigation();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // handle login
  const handleLogIn = async () => {
    // check if username and password are not empty
    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Alert", "Please enter username and password");
      return;
    }
    // otherwise check the existance of the user in the async storage
    const user = await AsyncStorage.getItem("user");
    if (user) {
      // if user exists, check if the password is correct
      const userObj = JSON.parse(user);
      if (userObj.username === username) {
        if (userObj.password === password) {
          // if password and username is correct, navigate to the home screen
          navigate.navigate("Home");
        } else {
          // if password is incorrect, show an error message
          Alert.alert("Alert", "Incorrect password");
        }
      } else {
        // if username is incorrect, show an error message
        Alert.alert("Alert", "Incorrect username");
      }
    } else {
      // if user does not exist, show an error message
      Alert.alert("Alert", "User does not exist");
    }
  };

  return (
    <View style={styles.container}>
      {/* logo here */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/water-drop.png")}
          style={styles.logo}
        />
      </View>
      <Text className="text-6xl text-blue-600 font-extrabold items-start justify-start mt-10 mb-5">
        Hydra
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setusername}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="grey"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        onPress={() => {
          handleLogIn();
        }}
        style={styles.signInbtn}
        android_ripple={{ color: "#fff" }}
      >
        <Text style={styles.signTxt}>
          LogIn
          {"  "}
          <AntDesign name="login" size={20} />
        </Text>
      </Pressable>

      {/* don’t have an account yet */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "gray", fontSize: 14, textAlign: "start" }}>
          Don't have an account?{" "}
          <Text
            style={{ color: "blue", fontWeight: "bold" }}
            onPress={() => {
              navigate.navigate("SignUp");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    opacity: 0.5,
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "lightblue",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightblue",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 0,
    height: 45,
    borderColor: "transparent",
  },
  icon: {
    padding: 10,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 280,
    height: 280,
  },
  signInbtn: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "lightblue",
    backgroundColor: "#3385ff",
    padding: 15,
    borderRadius: 5,
  },
  signTxt: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});

export default SignIn;

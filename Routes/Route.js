// main libraries here
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// componenets here
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";
// import Main

// icons here
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Main from "../screens/components/Main/Main";
import Setting from "../screens/components/Setting/Setting";

// navigation components here
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// main function here
const Route = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Define the bottom tab navigator
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Homee"
        component={Main}
        options={{
          header: () => null,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign
              name="home"
              color={focused ? "tomato" : "grey"}
              size={focused ? 24 : 26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => null,
          tabBarLabel: "Setting",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="filter"
              color={focused ? "tomato" : "grey"}
              size={focused ? 24 : 26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Combine both navigators into the main app container
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Route />
    </NavigationContainer>
  );
};

export default AppNavigator;
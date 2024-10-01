// App.js
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import AppNavigator from "./Routes/Route";
import { NotificationProvider } from "./screens/components/NotificationProvider/NotificationProvider";

// redux toolkit
import { Provider } from "react-redux";
import { store } from "./Features/Store/Store";

const App = () => {
  return (
    // <View>
    <Provider store={store}>
      <NotificationProvider>
        <AppNavigator />
      </NotificationProvider>
    </Provider>
    // {/* // <Text>lsjdnf</Text> */}
    // {/* </View> */}
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0F7FA",
  },
});

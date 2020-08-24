import React from "react";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddTaskScreen from "./src/screen/AddTaskScreen";
import EditTaskScreen from "./src/screen/EditTaskScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase";
import ENV from "./env.json";

require("firebase/firestore");

const firebaseConfig = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PRJ_ID,
  storageBucket: ENV.FIREBASE_SENDER_ID,
  messagingSenderId: ENV.FIREBASE_SENDER_ID,
  appId: ENV.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const defaultOptions = {
  headerShown: false,
};

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Login"
      component={LoginScreen}
      options={defaultOptions}
    />
    <MainStack.Screen
      name="Signup"
      component={SignupScreen}
      options={defaultOptions}
    />
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      options={defaultOptions}
    />
  </MainStack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={defaultOptions}
        />
        <RootStack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={defaultOptions}
        />
        <RootStack.Screen
          name="EditTask"
          component={EditTaskScreen}
          options={defaultOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

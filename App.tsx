import React from "react";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddTaskScreen from "./src/screen/AddTaskScreen";
import EditTaskScreen from "./src/screen/EditTaskScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const defaultOptions = {
  headerShown: false,
};

const MainStackScreen = () => (
  <MainStack.Navigator>
    {/* <MainStack.Screen
      name="Login"
      component={LoginScreen}
      options={defaultOptions}
    />
    <MainStack.Screen
      name="Signup"
      component={SignupScreen}
      options={defaultOptions}
    /> */}
    <MainStack.Screen
      name="Main"
      component={MainScreen}
      options={defaultOptions}
    />
  </MainStack.Navigator>
);

const App = () => (
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

export default App;

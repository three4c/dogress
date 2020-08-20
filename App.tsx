import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddTaskScreen from "./src/screen/AddTaskScreen";
import EditTaskScreen from "./src/screen/EditTaskScreen";

const App = createStackNavigator(
  {
    EditTask: { screen: EditTaskScreen },
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    AddTask: { screen: AddTaskScreen },
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {},
  }
);

export default createAppContainer(App);

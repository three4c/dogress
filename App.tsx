import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";
import AddTaskScreen from "./src/screen/AddTaskScreen";
import EditTaskScreen from "./src/screen/EditTaskScreen";

const App = createStackNavigator(
  {
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    AddTask: { screen: AddTaskScreen },
    EditTask: { screen: EditTaskScreen },
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {},
  }
);

export default createAppContainer(App);

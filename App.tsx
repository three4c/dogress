import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import MainScreen from "./src/screen/MainScreen";

const App = createStackNavigator(
  {
    Signup: { screen: SignupScreen },
    Main: { screen: MainScreen },
    Login: { screen: LoginScreen },
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {},
  }
);

export default createAppContainer(App);

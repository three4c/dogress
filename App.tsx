import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";

const App = createStackNavigator(
  {
    Signup: { screen: SignupScreen },
    Login: { screen: LoginScreen },
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {},
  }
);

export default createAppContainer(App);

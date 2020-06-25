import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoginScreen from "./src/screen/loginScreen";

const App = createStackNavigator(
  {
    Login: { screen: LoginScreen },
  },
  {
    defaultNavigationOptions: {},
  }
);

export default createAppContainer(App);

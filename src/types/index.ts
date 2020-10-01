/**
 * React NavigationのTypeScript対応
 *  @see https://reactnavigation.org/docs/typescript/
 */
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Main: undefined;
  AddTask: undefined;
  EditTask: undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Main" | "AddTask" | "EditTask"
>;

export interface NavigationProps {
  navigation: ScreenNavigationProps;
}

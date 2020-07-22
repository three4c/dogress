import React from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  add,
  clockRunning,
  cond,
  debug,
  divide,
  eq,
  floor,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  withOffset,
} from "react-native-redash";

const Swiper: React.FC = (props) => {
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();

  const translateX = withOffset(translation.x, state);
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[styles.swiperList, { transform: [{ translateX }] }]}
        >
          {React.Children.map(props.children, (child, index) => (
            <View key={index} style={styles.swiperItem}>
              {child}
            </View>
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperList: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  swiperItem: {
    width: "100%",
    height: "100%",
  },
});

export default Swiper;

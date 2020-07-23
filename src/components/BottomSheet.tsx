import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
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
  translate,
} from "react-native-redash";

const { width, height } = Dimensions.get("window");

const BottomSheet: React.FC = (props) => {
  const childrenArray = React.Children.toArray(props.children);
  const clock = useClock();
  const index = useValue(0);
  const offsetX = useValue(0);
  const translateX = useValue(0);
  const snapPoints = childrenArray.map((_, i) => i * -width);
  const {
    gestureHandler,
    state,
    velocity,
    translation,
  } = usePanGestureHandler();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, translation.x)),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        cond(not(clockRunning(clock)), [
          set(index, floor(divide(translateX, -width))),
        ]),
      ]),
    ],
    []
  );

  return (
    <View style={[styles.container]}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.bottomSheetList,
              {
                width: width * childrenArray.length,
                transform: [{ translateX }],
              },
            ]}
          >
            {React.Children.map(props.children, (child, index) => (
              <View key={index} style={styles.bottomSheetItem}>
                {child}
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    top: 264,
    width: "100%",
    height: "100%",
  },
  bottomSheetList: {
    flexDirection: "row",
    height,
  },
  bottomSheetItem: {
    width,
    height,
    overflow: "hidden",
  },
});

export default BottomSheet;

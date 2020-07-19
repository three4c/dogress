import React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { onGestureEvent, withSpring } from "react-native-redash";

const { Value } = Animated;
const config = {
  damping: 24,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

const BottomSheet: React.FC = (props) => {
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({
    translationY,
    state,
    velocityY,
  });

  const PEAK_Y = 264;

  const translateY = withSpring({
    state,
    value: translationY,
    velocity: velocityY,
    snapPoints: [-PEAK_Y, 0],
    config,
  });

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          { top: PEAK_Y, transform: [{ translateY: translateY }] },
        ]}
      >
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default BottomSheet;

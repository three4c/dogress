import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

const BottomSheet: React.FC = (props) => {
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event([
    {
      nativeEvent: {
        translationY: translateY,
      },
    },
  ]);

  const onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[styles.container, { transform: [{ translateY: translateY }] }]}
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
    position: "absolute",
    top: 264,
    width: "100%",
    height: "100%",
  },
});

export default BottomSheet;

import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Animated, Easing } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const BottomSheet: React.FC = (props) => {
  /** 子要素を配列に変換 */
  const childrenArray = React.Children.toArray(props.children);
  /** Animated.Valueもstateで操作することでアニメーションを実現 */
  const [panPosition] = useState(new Animated.Value(0));
  const [panStartPosition, setPanStartPosition] = useState(0);
  const [prevPanX, setPrevPanX] = useState(0);
  const [direction, setDirection] = useState(false);

  const slideTo = (index: number) => {
    Animated.timing(panPosition, {
      toValue: index,
      duration: 300,
      easing: Easing.ease,
    }).start();
  };

  const onPanHandler = (event: PanGestureHandlerGestureEvent) => {
    const calcPosition =
      panStartPosition - event.nativeEvent.translationX / width;

    if (calcPosition >= 0 && calcPosition <= childrenArray.length - 1) {
      panPosition.setValue(calcPosition);
      setDirection(event.nativeEvent.x < prevPanX);
      setPrevPanX(event.nativeEvent.x);
    }
  };

  const onPanStateChangeHandler = (
    event: PanGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === State.BEGAN) {
      setPanStartPosition((panPosition as any)._value);
    } else if (event.nativeEvent.state === State.END) {
      setPanStartPosition(0);
      slideTo(
        direction
          ? Math.ceil((panPosition as any)._value)
          : Math.floor((panPosition as any)._value)
      );
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanHandler}
      onHandlerStateChange={onPanStateChangeHandler}
    >
      <View style={styles.container}>
        {React.Children.map(props.children, (child, index) => (
          <Animated.View
            key={index}
            style={[
              StyleSheet.absoluteFill,
              styles.bottomSheetItem,
              {
                transform: [
                  {
                    translateX: panPosition.interpolate({
                      inputRange: [index - 1, index, index + 1],
                      outputRange: [width, 0, -width],
                    }),
                  },
                ],
              },
            ]}
          >
            {child}
          </Animated.View>
        ))}
      </View>
    </PanGestureHandler>
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

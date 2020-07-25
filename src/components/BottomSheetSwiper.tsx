import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { AnimatedValue } from "react-navigation";

const { width, height } = Dimensions.get("window");

const BottomSheetSwiper: React.FC = (props) => {
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
      easing: Easing.in(Easing.out(Easing.ease)),
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
      setPanStartPosition((panPosition as AnimatedValue)._value);
    } else if (event.nativeEvent.state === State.END) {
      setPanStartPosition(0);
      slideTo(
        direction
          ? Math.ceil((panPosition as AnimatedValue)._value)
          : Math.floor((panPosition as AnimatedValue)._value)
      );
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanHandler}
      onHandlerStateChange={onPanStateChangeHandler}
    >
      <View style={styles.container}>
        <View style={styles.paginationList}>
          {React.Children.map(props.children, (_, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => slideTo(index)}
            >
              <Animated.View
                style={[
                  styles.paginationItem,
                  {
                    backgroundColor: panPosition.interpolate({
                      inputRange: [
                        index - 1,
                        index - 0.8,
                        index,
                        index + 0.8,
                        index + 1,
                      ],
                      outputRange: ["#ddd", "#ddd", "#333", "#ddd", "#ddd"],
                    }),
                  },
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
        </View>

        <View
          style={[
            styles.swiperList,
            { width: width * childrenArray.length - 1 },
          ]}
        >
          {React.Children.map(props.children, (child, index) => (
            <Animated.View
              key={index}
              style={[
                StyleSheet.absoluteFill,
                styles.swiperItem,
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
      </View>
    </PanGestureHandler>
  );
};

/** 　width, heightを予めもたせることでパフォーマンス向上を狙う */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    top: 264,
  },
  paginationList: {
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 24,
  },
  paginationItem: {
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
    width: 8,
    height: 8,
  },
  swiperList: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 56,
  },
  swiperItem: {
    width,
    height,
  },
});

export default BottomSheetSwiper;

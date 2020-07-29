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
  /** Swiper */
  const [panPositionX] = useState(new Animated.Value(0));
  const [panStartPosition, setPanStartPosition] = useState(0);
  const [prevPanX, setPrevPanX] = useState(0);
  /** BottomSheet */
  const [panPositionY] = useState(new Animated.Value(0));
  const [prevPanY, setPrevPanY] = useState(0);

  const [direction, setDirection] = useState<"" | "x" | "y">("");

  const slideTo = (index: number) => {
    Animated.timing(panPositionX, {
      toValue: index,
      duration: 300,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const swiperTo = (value: number) => {
    Animated.timing(panPositionY, {
      toValue: value,
      duration: 300,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const onPanHandler = (event: PanGestureHandlerGestureEvent) => {
    const calcPosition =
      panStartPosition - event.nativeEvent.translationX / width;

    const PEAK_X = Math.abs(prevPanX - event.nativeEvent.x);
    const PEAK_Y = Math.abs(prevPanY - event.nativeEvent.y);

    /** x or y方向のどちらに移動したかを検知 */
    setDirection(PEAK_X < PEAK_Y ? "y" : "x");

    if (direction === "x") {
      if (calcPosition >= 0 && calcPosition <= childrenArray.length - 1) {
        panPositionX.setValue(calcPosition);
      }
    }

    if (direction === "y") {
      // panPositionY.setValue(event.nativeEvent.y);
      console.log(event.nativeEvent.y);
    }
  };

  const onPanStateChangeHandler = (
    event: PanGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === State.BEGAN) {
      /** スワイプ開始時の値を保持 */
      setPrevPanX(event.nativeEvent.x);
      setPrevPanY(event.nativeEvent.y);

      /** @todo _valueは非推奨なので後ほど対応 */
      setPanStartPosition((panPositionX as AnimatedValue)._value);
    } else if (event.nativeEvent.state === State.END) {
      /** 閾値を超えるとスワイプする */
      const PEAK_X = Math.abs(event.nativeEvent.x - prevPanX) > 24;
      const PEAL_Y = Math.abs(event.nativeEvent.y - prevPanY) > 24;

      slideTo(
        event.nativeEvent.x < prevPanX
          ? PEAK_X
            ? Math.ceil((panPositionX as AnimatedValue)._value)
            : Math.floor((panPositionX as AnimatedValue)._value)
          : PEAK_X
          ? Math.floor((panPositionX as AnimatedValue)._value)
          : Math.ceil((panPositionX as AnimatedValue)._value)
      );

      // swiperTo((panPositionY as AnimatedValue)._value);

      setDirection("");
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanHandler}
      onHandlerStateChange={onPanStateChangeHandler}
    >
      <Animated.View style={[StyleSheet.absoluteFill, styles.container]}>
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
                    backgroundColor: panPositionX.interpolate({
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
                      translateX: panPositionX.interpolate({
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
      </Animated.View>
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

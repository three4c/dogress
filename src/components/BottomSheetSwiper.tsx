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

const { width } = Dimensions.get("window");

interface BottomSheetSwiperProps {
  swipeUpFn: (isSwipeUp: boolean) => void;
}

const BottomSheetSwiper: React.FC<BottomSheetSwiperProps> = (props) => {
  /** 子要素を配列に変換 */
  const childrenArray = React.Children.toArray(props.children);
  /** Animated.Valueもstateで操作することでアニメーションを実現 */
  /** Swiper */
  const [panPositionX] = useState(new Animated.Value(0));
  const [panStartPositionX, setPanStartPositionX] = useState(0);
  const [prevPanX, setPrevPanX] = useState(0);
  /** BottomSheet */
  const [panPositionY] = useState(new Animated.Value(264));
  const [panStartPositionY, setPanStartPositionY] = useState(0);
  const [prevPanY, setPrevPanY] = useState(0);
  const [direction, setDirection] = useState<"" | "x" | "y">("");

  const DURATION_TIME = 200;

  const slideTo = (index: number) => {
    Animated.timing(panPositionX, {
      toValue: index,
      duration: DURATION_TIME,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const swiperTo = (value: number) => {
    Animated.timing(panPositionY, {
      toValue: value,
      duration: DURATION_TIME,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const onPanHandler = (event: PanGestureHandlerGestureEvent) => {
    const calcPositionX =
      panStartPositionX - event.nativeEvent.translationX / width;
    const calcPositionY = panStartPositionY + event.nativeEvent.translationY;

    const PEAK_X = Math.abs(prevPanX - event.nativeEvent.translationX);
    const PEAK_Y = Math.abs(prevPanY - event.nativeEvent.translationY);

    /**
     * x or y方向のどちらに移動したかを検知
     * 方向が決定したら、指を離すまで変更しない
     */
    if (direction === "") {
      setDirection(PEAK_X < PEAK_Y ? "y" : "x");
    }

    if (direction === "x") {
      if (calcPositionX >= 0 && calcPositionX <= childrenArray.length - 1) {
        panPositionX.setValue(calcPositionX);
      }
    }

    if (direction === "y") {
      if (calcPositionY >= 72 && calcPositionY <= 264) {
        panPositionY.setValue(calcPositionY);
      }

      if (event.nativeEvent.translationY < prevPanY) {
        props.swipeUpFn(true);
      }
    }
  };

  const onPanStateChangeHandler = (
    event: PanGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === State.BEGAN) {
      /** スワイプ開始時の値を保持 */
      setPrevPanX(event.nativeEvent.translationX);
      setPrevPanY(event.nativeEvent.translationY);

      /** @todo _valueは非推奨なので後ほど対応 */
      setPanStartPositionX((panPositionX as any)._value);
      setPanStartPositionY((panPositionY as any)._value);
    } else if (event.nativeEvent.state === State.END) {
      /** 閾値を超えるとスワイプする */
      const PEAK_X = Math.abs(event.nativeEvent.translationX - prevPanX) > 24;
      const PEAK_Y = Math.abs(event.nativeEvent.translationY - prevPanY) > 24;

      if (direction === "x") {
        slideTo(
          event.nativeEvent.translationX < prevPanX
            ? PEAK_X
              ? Math.ceil((panPositionX as any)._value)
              : Math.floor((panPositionX as any)._value)
            : PEAK_X
            ? Math.floor((panPositionX as any)._value)
            : Math.ceil((panPositionX as any)._value)
        );
      }

      if (direction === "y") {
        swiperTo(
          event.nativeEvent.translationY < prevPanY
            ? PEAK_Y
              ? 72
              : 264
            : PEAK_Y
            ? 264
            : 72
        );

        if (event.nativeEvent.translationY > prevPanY) {
          setTimeout(() => {
            props.swipeUpFn(false);
          }, DURATION_TIME);
        }
      }

      setDirection("");
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onPanHandler}
      onHandlerStateChange={onPanStateChangeHandler}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          { transform: [{ translateY: panPositionY }] },
        ]}
      >
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
            StyleSheet.absoluteFill,
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
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    marginTop: 56,
  },
  swiperItem: {
    width,
  },
});

export default BottomSheetSwiper;

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";

import CustomText from "./CustomText";
import { AnimatedValue } from "react-navigation";

interface BottomSheetProps {
  showFn: (isShow: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  const [backgroundOpacity] = useState(new Animated.Value(0));
  const [panPositionY] = useState(new Animated.Value(0));
  const [panStartPositionY, setPanStartPositionY] = useState(0);
  const [prevPanY, setPrevPanY] = useState(0);
  const [bottomSheetHeight, setBottomSheetHeight] = useState(0);

  const DURATION_TIME = 200;

  const measure = (height: number) => {
    panPositionY.setValue(height);
    setBottomSheetHeight(height);
  };

  const swiperTo = (value: number) => {
    Animated.timing(panPositionY, {
      toValue: value,
      duration: DURATION_TIME,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const opacityTo = (value: number) => {
    Animated.timing(backgroundOpacity, {
      toValue: value === 0 ? 1 : 0,
      duration: DURATION_TIME,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const onPanHandler = (event: PanGestureHandlerGestureEvent) => {
    const calcPositonY = panStartPositionY + event.nativeEvent.translationY;

    if (calcPositonY > 0) {
      panPositionY.setValue(calcPositonY);
    }
  };

  const onPanStateChangeHandler = (
    event: PanGestureHandlerStateChangeEvent
  ) => {
    if (event.nativeEvent.state === State.BEGAN) {
      setPrevPanY(event.nativeEvent.translationY);
      setPanStartPositionY((panPositionY as AnimatedValue)._value);
    } else if (event.nativeEvent.state === State.END) {
      const PEAK_Y = Math.abs(event.nativeEvent.translationY - prevPanY) > 24;

      swiperTo(
        event.nativeEvent.translationY > prevPanY && PEAK_Y
          ? bottomSheetHeight
          : 0
      );

      if (event.nativeEvent.translationY > prevPanY && PEAK_Y) {
        setTimeout(() => {
          opacityTo(1);
        }, DURATION_TIME);

        setTimeout(() => {
          props.showFn(false);
        }, DURATION_TIME * 2);
      }
    }
  };

  useEffect(() => {
    opacityTo(0);

    setTimeout(() => {
      Animated.timing(panPositionY, {
        toValue: 0,
        duration: DURATION_TIME,
        easing: Easing.in(Easing.out(Easing.ease)),
      }).start();
    }, 100);
  }, []);

  return (
    <PanGestureHandler
      onGestureEvent={onPanHandler}
      onHandlerStateChange={onPanStateChangeHandler}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          { opacity: backgroundOpacity },
        ]}
      >
        <Animated.View style={{ transform: [{ translateY: panPositionY }] }}>
          <View
            style={styles.bottomSheet}
            onLayout={(event) => {
              measure(event.nativeEvent.layout.height);
            }}
          >
            <View style={styles.chip} />
            <View style={styles.content}>
              <CustomText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                nemo deserunt voluptas commodi vel quis voluptatum ea voluptate
                in excepturi debitis iusto facere eligendi laboriosam doloribus,
                tenetur beatae fugiat vitae.
              </CustomText>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    justifyContent: "flex-end",
  },
  chip: {
    backgroundColor: "#ccc",
    borderRadius: 2,
    marginTop: 8,
    width: 32,
    height: 4,
  },
  bottomSheet: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    padding: 24,
  },
});

export default BottomSheet;

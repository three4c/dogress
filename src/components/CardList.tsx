import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CustomText from "./CustomText";

interface CardListProps {
  title: string;
  isSwipeUp: boolean;
  openFn: () => void;
  items: {
    deadline: number;
    description: string;
    today?: boolean;
    doneTime?: string;
    progress?: number;
  }[];
}

const CardList: React.FC<CardListProps> = (props) => {
  /** @todo 何故かundefinedが型推論される */
  const progressArray = props.items.map((item) => {
    if (item.progress) {
      return new Animated.Value(item.progress);
    }
  });

  console.log(progressArray);

  const [pressProgress] = useState(progressArray);
  const DURATION_TIME = 200;

  const pressInHandler = (index: number) => {
    Animated.timing(pressProgress[index] as any, {
      toValue: 100,
      duration: DURATION_TIME,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  return (
    <View>
      <View style={styles.title}>
        <CustomText>{props.title}</CustomText>
      </View>
      <View style={styles.list}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <ScrollView
          style={{
            marginBottom: props.isSwipeUp ? 72 + 32.5 : 264 + 32.5,
          }}
        >
          {props.items.map((item, index) => (
            <TouchableHighlight
              onPressIn={() => pressInHandler(index)}
              underlayColor="#fff"
              key={index}
              style={[
                styles.listItem,
                index === props.items.length - 1 && { marginBottom: 24 },
              ]}
            >
              <React.Fragment>
                <View style={styles.deadline}>
                  <CustomText size={10} type="bold" color="#ccc">
                    {item.today
                      ? "今日まで"
                      : item.doneTime
                      ? `${item.doneTime}に完了`
                      : `残り${item.deadline}日`}
                  </CustomText>
                </View>
                <TouchableHighlight
                  style={styles.button}
                  underlayColor="transparent"
                  onPress={props.openFn}
                >
                  <View style={styles.bullet}>
                    <View style={styles.bulletItem} />
                    <View style={styles.bulletItem} />
                    <View style={styles.bulletItem} />
                  </View>
                </TouchableHighlight>
                <View>
                  <CustomText numberOfLines={2} ellipsizeMode="tail">
                    {item.description}
                  </CustomText>
                </View>
                {item.progress && (
                  <View style={styles.progressWrapper}>
                    <View
                      style={[styles.progress, { width: `${item.progress}%` }]}
                    />
                  </View>
                )}
              </React.Fragment>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: 24,
    marginBottom: 8,
  },
  flexArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deadline: {
    marginBottom: 8,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 24,
    zIndex: 2,
  },

  list: {
    position: "relative",
    marginBottom: 32,
  },
  listItem: {
    marginTop: 16,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    /** Android */
    elevation: 1,
  },
  button: {
    position: "absolute",
    top: 12,
    right: 24,
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  bullet: {
    flexDirection: "row",
  },
  bulletItem: {
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginLeft: 2,
    width: 4,
    height: 4,
  },
  progressWrapper: {
    position: "relative",
    backgroundColor: "rgba(70, 101, 255, 0.24)",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 16,
    width: "100%",
    height: 6,
  },
  progress: {
    backgroundColor: "#4665ff",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
});

export default CardList;

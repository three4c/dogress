import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SQLite from "expo-sqlite";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../store";

import { selectTodo } from "../store";

import CustomText from "./CustomText";

interface CardListProps {
  title: string;
  isSwipeUp: boolean;
  openFn: () => void;
  items: GlobalState["todos"];
}

const CardList: React.FC<CardListProps> = (props) => {
  const progressArray = props.items.map(
    (item) => new Animated.Value(item.progress)
  );

  const [pressProgress, setPressProgress] = useState<Animated.Value[]>([]);
  const DURATION_TIME = 56;

  /** Global State */
  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispath = useDispatch();

  const pressInHandler = (index: number) => {
    Animated.timing(pressProgress[index], {
      toValue: 100,
      duration: DURATION_TIME * (100 - (pressProgress[index] as any)._value),
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const pressOutHandler = (index: number) => {
    const value = (pressProgress[index] as any)._value;
    pressProgress[index].setValue(value);

    const db = SQLite.openDatabase("db.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `update items set progress=${
            (pressProgress[index] as any)._value
          } where id = ?;`,
          [store.todoId]
        );
      },
      (error) => {
        console.log("fail_update", error);
      },
      () => {
        console.log("success_update");
      }
    );
  };

  useEffect(() => {
    setPressProgress(progressArray);
  }, [props.items]);

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
          {props.items.map((item, index) => {
            const keyName = {
              remaining: item.today,
              done: item.doneTime,
              progress: !item.today && !item.doneTime,
            };

            let selectKeyName = "";

            Object.values(keyName).forEach((item, index) => {
              if (item) {
                selectKeyName = Object.keys(keyName)[index];
              }
            });

            return (
              <TouchableHighlight
                onLongPress={() => {
                  !props.items[index].today && !props.items[index].doneTime
                    ? pressInHandler(index)
                    : undefined;
                  dispath(selectTodo({ [selectKeyName]: index }));
                }}
                onPressOut={() =>
                  !props.items[index].today && !props.items[index].doneTime
                    ? pressOutHandler(index)
                    : undefined
                }
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
                    onPress={() => {
                      props.openFn();
                      dispath(selectTodo({ [selectKeyName]: index }));
                    }}
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
                  {pressProgress[index] && !item.today && !item.doneTime && (
                    <View style={styles.progressWrapper}>
                      <Animated.View
                        style={[
                          styles.progress,
                          {
                            width: pressProgress[index].interpolate({
                              inputRange: [0, 100],
                              outputRange: ["0%", "100%"],
                            }),
                          },
                        ]}
                      />
                    </View>
                  )}
                </React.Fragment>
              </TouchableHighlight>
            );
          })}
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

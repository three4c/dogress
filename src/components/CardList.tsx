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
import { GlobalState, setTodo } from "../store";

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

  const remainingArray: Animated.Value[] = [];

  /** map, filterよりはforEachでundefinedを入れない */
  props.items.forEach((item) => {
    if (item.today && !item.doneTime) {
      remainingArray.push(new Animated.Value(0));
    }
  });

  const [pressProgress, setPressProgress] = useState<Animated.Value[]>([]);
  const [pressRemaining, setPressRemaining] = useState<Animated.Value[]>([]);
  const DURATION_TIME = 40;

  /** Global State */
  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispath = useDispatch();

  const longPressProgressHandler = (index: number) => {
    Animated.timing(pressProgress[index], {
      toValue: 100,
      duration: DURATION_TIME * (100 - (pressProgress[index] as any)._value),
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const pressOutProgressHandler = (index: number) => {
    const value = (pressProgress[index] as any)._value;
    pressProgress[index].setValue(value);

    const today = new Date();
    const doneTime = `${
      today.getMonth() + 1
    }月${today.getDate()}日 ${today.getHours()}時${today.getMinutes()}分`;

    if (value === 100) {
      const newTodosArray = [...store.todos];
      const newProgressArray = [...store.progress];

      newTodosArray.forEach((todosItem, todosIndex) => {
        if (todosItem.id === newProgressArray[index].id) {
          newTodosArray[todosIndex].doneTime = doneTime;
        }
      });
      dispath(setTodo(newTodosArray));
    }

    const db = SQLite.openDatabase("db.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `update items set progress=${value}${
            value === 100 ? `, doneTime="${doneTime}"` : `, doneTime=""`
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

  const longPressRemainingHandler = (index: number) => {
    Animated.timing(pressRemaining[index], {
      toValue: 100,
      duration: 400,
      easing: Easing.in(Easing.out(Easing.ease)),
    }).start();
  };

  const pressOutRemainingHandler = (index: number) => {
    const value = (pressRemaining[index] as any)._value;
    pressRemaining[index].setValue(value);

    const today = new Date();
    const doneTime = `${
      today.getMonth() + 1
    }月${today.getDate()}日 ${today.getHours()}時${today.getMinutes()}分`;
    const newTodosArray = [...store.todos];
    const newProgressArray = [...store.remaining];
    let id = 0;

    newTodosArray.forEach((todosItem, todosIndex) => {
      if (todosItem.id === newProgressArray[index].id) {
        newTodosArray[todosIndex].doneTime = doneTime;
        id = newTodosArray[todosIndex].id;
      }
    });

    dispath(setTodo(newTodosArray));

    const db = SQLite.openDatabase("db.db");
    db.transaction(
      (tx) => {
        tx.executeSql(`update items set doneTime="${doneTime}" where id = ?;`, [
          id,
        ]);
      },
      (error) => {
        console.log("fail_update", error);
      },
      () => {
        console.log("success_update");
      }
    );
  };

  /** タスクが完了になるタイミング */
  useEffect(() => {
    setPressProgress(progressArray);
    setPressRemaining(remainingArray);
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
                  dispath(selectTodo({ [selectKeyName]: index }));
                  !props.items[index].today && !props.items[index].doneTime
                    ? longPressProgressHandler(index)
                    : !props.items[index].doneTime
                    ? longPressRemainingHandler(index)
                    : undefined;
                }}
                onPressOut={() =>
                  !props.items[index].today && !props.items[index].doneTime
                    ? pressOutProgressHandler(index)
                    : !props.items[index].doneTime
                    ? pressOutRemainingHandler(index)
                    : undefined
                }
                underlayColor="transparent"
                key={index}
              >
                <Animated.View
                  style={[
                    styles.listItem,
                    index === props.items.length - 1 && {
                      marginBottom: 24,
                    },
                    pressRemaining[index] &&
                      props.items[index].today &&
                      !props.items[index].doneTime && {
                        transform: [
                          {
                            scale: pressRemaining[index].interpolate({
                              inputRange: [0, 100],
                              outputRange: [1, 0.96],
                            }),
                          },
                        ],
                      },
                  ]}
                >
                  <View style={styles.deadline}>
                    <CustomText size={10} type="bold" color="#ccc">
                      {item.today && !item.doneTime
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
                </Animated.View>
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

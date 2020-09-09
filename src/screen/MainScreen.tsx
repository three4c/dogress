import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import * as SQLite from "expo-sqlite";

import BottomSheet from "../components/BottomSheet";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
import CardList from "../components/CardList";
import CountBoard from "../components/CountBoard";
import CustomText from "../components/CustomText";
import CircleButton from "../components/CircleButton";
import Title from "../components/Title";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState, setTodo, getTodo, deleteTodo } from "../store";

import { NavigationProps } from "../types";

interface MainScreenProps extends NavigationProps {}

const MainScreen: React.FC<MainScreenProps> = (props) => {
  const [isSwipeUp, setSwipeUp] = useState(false);
  const [isShow, setShow] = useState(false);

  /** Global State */
  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispath = useDispatch();

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
    setShow(false);
  };

  const db = SQLite.openDatabase("db.db");

  const deleteHandler = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from items where id = ?;", [store.todoId]);
      },
      (error) => {
        console.log("fail_delete", error);
      },
      () => {
        console.log("success_delete");
        setShow(false);
      }
    );

    dispath(deleteTodo());
  };

  const editHandler = () => {
    navigationHandler("EditTask");
  };

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists items (id integer primary key not null, deadline int, description text, createdOn text, doneTime text, progress int);",
          []
        );
      },
      () => {
        console.log("fail_create");
      },
      () => {
        console.log("success_create");
      }
    );

    const results: {
      id: number;
      deadline: number;
      description: string;
      createdOn: string;
      doneTime: string;
      progress: number;
    }[] = [];

    db.transaction(
      (tx) => {
        tx.executeSql("select * from items", [], (_, items) => {
          for (let i = 0; i < items.rows.length; i++) {
            results.push(items.rows.item(i));
          }
        });
      },
      () => {
        console.log("fail_select");
      },
      () => {
        console.log("success_select");
        const convertResults = results.map((item) => {
          const diffDay = Math.floor(
            (new Date().getTime() - new Date(item.createdOn).getTime()) /
              (1000 * 60 * 60 * 24)
          );

          return {
            id: item.id,
            deadline: item.deadline - diffDay,
            description: item.description,
            today: item.deadline <= diffDay,
            doneTime: item.doneTime,
            progress: item.progress,
          };
        });
        dispath(setTodo(convertResults));
      }
    );
  }, []);

  useEffect(() => {
    dispath(getTodo());
    console.log("Get Todos", store.todos);
  }, [store.todos]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>
          <CustomText color="#fff" size={24}>
            タスク
          </CustomText>
        </Title>
      </View>
      <CountBoard
        remaining={store.remaining.length}
        done={store.done.length}
        progress={store.progress.length}
      />
      <BottomSheetSwiper swipeUpFn={setSwipeUp}>
        <CardList
          title="残り"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={store.remaining}
        />
        <CardList
          title="完了"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={store.done}
        />
        <CardList
          title="進行中"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={store.progress}
        />
      </BottomSheetSwiper>
      <CircleButton openFn={() => navigationHandler("AddTask")} />
      <BottomSheet isShow={isShow} closeFn={() => setShow(false)}>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={deleteHandler}
        >
          <CustomText type="bold" color="#e0245e">
            削除
          </CustomText>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={editHandler}
        >
          <CustomText type="bold">タスクを編集する</CustomText>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={() => setShow(false)}
        >
          <CustomText type="bold">キャンセル</CustomText>
        </TouchableHighlight>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4665ff",
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 48,
  },
  menu: {
    padding: 8,
  },
});

export default MainScreen;

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
import { TodoState, getTodo } from "../store";

import { NavigationProps } from "../types";

interface InsertDatabaseType {
  id: number;
  deadline: number;
  description: string;
  createdOn: string;
  doneTime: string;
  progress: number;
}

interface FilterDatabaseType {
  deadline: number;
  description: string;
  today: boolean;
  doneTime: string;
  progress: number;
}

interface MainScreenProps extends NavigationProps {}

const MainScreen: React.FC<MainScreenProps> = (props) => {
  const [isSwipeUp, setSwipeUp] = useState(false);
  const [isShow, setShow] = useState(false);
  const [todos, setTodos] = useState<FilterDatabaseType[]>([]);
  const dispath = useDispatch();
  const hoge = useSelector<any, TodoState["todos"]>((state) => state.todos);
  const remaining = todos.filter((item) => item.today);
  const done = todos.filter((item) => item.doneTime);
  const progress = todos.filter((item) => !item.today && !item.doneTime);

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
    setShow(false);
  };

  const db = SQLite.openDatabase("db.db");

  const deleteHandler = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from items where id = ?;", [id]);
      },
      (error) => {
        console.log("fail_delete", error);
      },
      () => {
        console.log("success_delete");
        setShow(false);
      }
    );
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
  }, []);

  useEffect(() => {
    const results: InsertDatabaseType[] = [];
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
            deadline: item.deadline,
            description: item.description,
            today: item.deadline === diffDay,
            doneTime: item.doneTime,
            progress: item.progress,
          };
        });
        dispath(getTodo({ todos: convertResults }));
        setTodos(convertResults);
      }
    );
  }, []);

  console.log("aaaaaaaa", hoge);

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
        remaining={remaining.length}
        done={done.length}
        progress={progress.length}
      />
      <BottomSheetSwiper swipeUpFn={setSwipeUp}>
        <CardList
          title="残り"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={remaining}
        />
        <CardList
          title="完了"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={done}
        />
        <CardList
          title="進行中"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={progress}
        />
      </BottomSheetSwiper>
      <CircleButton openFn={() => navigationHandler("AddTask")} />
      <BottomSheet isShow={isShow} closeFn={() => setShow(false)}>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={() => deleteHandler(4)}
        >
          <CustomText type="bold" color="#e0245e">
            削除
          </CustomText>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={() => navigationHandler("EditTask")}
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

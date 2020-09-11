import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState, getTodo, setTodo } from "../store";

import { NavigationProps } from "../types";

interface EditTaskScreenProps extends NavigationProps {}

const EditTaskScreen: React.FC<EditTaskScreenProps> = (props) => {
  /** Global State */
  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispath = useDispatch();
  const storeTask =
    store[Object.keys(store.todoKey)[0] as "remaining" | "done" | "progress"][
      Object.values(store.todoKey)[0]
    ];

  const [deadline, setDeadline] = useState(storeTask.deadline);
  const [description, setDescription] = useState(storeTask.description);

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  const editHandler = () => {
    const newTodosArray = [...store.todos];
    const newFilterArray = [
      ...store[
        Object.keys(store.todoKey)[0] as "remaining" | "done" | "progress"
      ],
    ];

    newTodosArray.forEach((todosItem, todosIndex) => {
      if (todosItem.id === newFilterArray[Object.values(store.todoKey)[0]].id) {
        newTodosArray[todosIndex].deadline = deadline;
        newTodosArray[todosIndex].description = description;
      }
    });
    dispath(setTodo(newTodosArray));

    const db = SQLite.openDatabase("db.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `update items set deadline=${deadline}, description="${description}" where id = ?;`,
          [store.todoId]
        );
      },
      () => {
        console.log("fail_update");
      },
      () => {
        console.log("success_update");
        props.navigation.goBack();
      }
    );
  };

  return (
    <View style={styles.container}>
      <Title>
        <CustomText color="#fff" size={24}>
          タスクを編集
        </CustomText>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigationHandler("Main")}
        >
          <CustomText color="#fff" size={14}>
            キャンセル
          </CustomText>
        </TouchableHighlight>
      </Title>
      <View style={styles.inputBox}>
        <CustomText color="#fff" size={10} type="bold">
          日数
        </CustomText>
        <TextInput
          autoCapitalize="none"
          autoCorrect
          value={String(deadline)}
          onChangeText={(text) => setDeadline(Number(text))}
          selectionColor="#fff"
          keyboardType="numeric"
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputBox}>
        <CustomText color="#fff" size={10} type="bold">
          内容
        </CustomText>
        <TextInput
          autoCapitalize="none"
          autoCorrect
          value={description}
          onChangeText={(text) => setDescription(text)}
          selectionColor="#fff"
          style={styles.textInput}
        />
      </View>
      <View style={styles.submitButton}>
        <SubmitButton onPress={editHandler}>
          <CustomText color="#fff">編集を完了する</CustomText>
        </SubmitButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4665ff",
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  inputBox: {
    marginTop: 48,
  },
  textInput: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  submitButton: {
    position: "absolute",
    left: 24,
    bottom: 72,
    width: "100%",
  },
});

export default EditTaskScreen;

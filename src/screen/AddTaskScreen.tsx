import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState, addTodo } from "../store";

import { NavigationProps } from "../types";

interface AddTaskScreenProps extends NavigationProps {}

const AddTaskScreen: React.FC<AddTaskScreenProps> = (props) => {
  const [deadline, setDeadline] = useState(0);
  const [description, setDescription] = useState("");

  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispatch = useDispatch();

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  const insertHandler = () => {
    if (!deadline && !description) {
      return;
    }

    const db = SQLite.openDatabase("db.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into items (deadline, description, createdOn, doneTime, progress) values (?, ?, ?, ?, ?);",
          [deadline, description, String(new Date()), "", 0]
        );
      },
      (error) => {
        console.log("fail_insert", error);
      },
      () => {
        console.log("success_insert");
        props.navigation.goBack();
      }
    );

    const todo = {
      id:
        store.todos.length === 0
          ? 0
          : store.todos[store.todos.length - 1].id + 1,
      deadline: deadline,
      description: description,
      today: deadline === 0,
      doneTime: "",
      progress: 0,
    };

    dispatch(addTodo(todo));
  };

  return (
    <View style={styles.container}>
      <Title>
        <CustomText color="#fff" size={24}>
          タスクを追加
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
          placeholder="タスクを完了するまでの日数を入力しましょう"
          placeholderTextColor="#6b84ff"
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
          placeholder="これから行うタスクの内容を入力しましょう"
          placeholderTextColor="#6b84ff"
          onChangeText={(text) => setDescription(text)}
          selectionColor="#fff"
          style={styles.textInput}
        />
      </View>
      <View style={styles.submitButton}>
        <SubmitButton onPress={insertHandler}>
          <CustomText color="#fff">追加する</CustomText>
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
    color: "#fff",
    marginTop: 8,
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

export default AddTaskScreen;

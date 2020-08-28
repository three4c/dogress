import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

import { NavigationProps } from "../types";

interface AddTaskScreenProps extends NavigationProps {}

const AddTaskScreen: React.FC<AddTaskScreenProps> = (props) => {
  const [deadline, setDeadline] = useState(0);
  const [description, setDescription] = useState("");

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  const submitHandler = () => {
    const db = SQLite.openDatabase("db.db");

    db.transaction(
      (tx) => {
        tx.executeSql(
          `insert into items (deadline, description, createdOn) values (?, ?, ?);`,
          [deadline, description, String(new Date())]
        );
      },
      () => {
        console.log("fail_insert");
      },
      () => {
        console.log("success_insert");
        props.navigation.goBack();
      }
    );
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
        <SubmitButton onPress={submitHandler}>
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

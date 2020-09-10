import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

import { useDispatch, useSelector } from "react-redux";
import { GlobalState, getTodo } from "../store";

import { NavigationProps } from "../types";

interface EditTaskScreenProps extends NavigationProps {}

const EditTaskScreen: React.FC<EditTaskScreenProps> = (props) => {
  const [deadline, setDeadline] = useState(0);
  const [description, setDescription] = useState("");

  /** Global State */
  const store = useSelector<GlobalState, GlobalState>((state) => state);
  const dispath = useDispatch();

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  const editHandler = () => {
    const newArray = [
      ...store[
        Object.keys(store.todoKey)[0] as "remaining" | "done" | "progress"
      ],
    ];
    newArray[Object.values(store.todoKey)[0]].deadline = deadline;
    newArray[Object.values(store.todoKey)[0]].description = description;
    console.log("aaaaaaaaaa", newArray);
    dispath(getTodo());
  };

  return (
    <View style={styles.container}>
      <Title>
        <CustomText color="#fff" size={24}>
          タスクを編集
        </CustomText>
        <TouchableHighlight onPress={() => navigationHandler("Main")}>
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
          value="hogehoge"
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
          value="hogehoge"
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

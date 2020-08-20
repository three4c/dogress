import React from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

const AddTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Title>
        <CustomText color="#fff" size={24}>
          タスクを追加
        </CustomText>
        <TouchableHighlight onPress={() => console.log("hoge")}>
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
          placeholder="タスクを完了するまでの日数を入力しましょう"
          placeholderTextColor="#6b84ff"
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
          selectionColor="#fff"
          style={styles.textInput}
        />
      </View>
      <View style={styles.submitButton}>
        <SubmitButton onPress={() => console.log("AddTask")}>
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

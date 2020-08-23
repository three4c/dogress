import React from "react";
import { StyleSheet, View, TouchableHighlight, TextInput } from "react-native";

import SubmitButton from "../components/SubmitButton";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

import { NavigationProps } from "../types";

interface EditTaskScreenProps extends NavigationProps {}

const EditTaskScreen: React.FC<EditTaskScreenProps> = (props) => {
  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
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
        <TextInput value="hogehoge" style={styles.textInput} />
      </View>
      <View style={styles.inputBox}>
        <CustomText color="#fff" size={10} type="bold">
          内容
        </CustomText>
        <TextInput
          autoCapitalize="none"
          autoCorrect
          value="hogehoge"
          selectionColor="#fff"
          style={styles.textInput}
        />
      </View>
      <View style={styles.submitButton}>
        <SubmitButton onPress={() => console.log("AddTask")}>
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

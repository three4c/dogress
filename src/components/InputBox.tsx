import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

interface InputBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={props.placeholder}
        placeholderTextColor="#6b84ff"
        onChangeText={(text) => props.onChangeText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    backgroundColor: "#4665ff",
    borderColor: "#6b84ff",
    borderRadius: 32,
    borderWidth: 5,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    paddingLeft: 32,
    height: 64,
  },
});

export default InputBox;

import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

interface InputBoxProps {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <View>
      <TextInput
        style={styles.inputBox}
        placeholder={props.placeholder}
        onChangeText={(text) => props.onChangeText(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {},
});

export default InputBox;

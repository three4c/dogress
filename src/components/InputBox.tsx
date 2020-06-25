import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
} from "react-native";

interface InputBoxProps {
  autoCapitalize?: "none";
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  placeholder: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        autoCapitalize={props.autoCapitalize}
        autoCorrect={props.autoCorrect}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor="#6b84ff"
        onChangeText={(text) => props.onChangeText(text)}
        style={styles.textInput}
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

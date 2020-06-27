import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

interface SubmitButtonProps {
  disabled?: boolean;
  onPress: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.container}
      disabled={props.disabled}
      underlayColor="transparent"
    >
      <View style={styles.submitButton}>{props.children}</View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  submitButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4665ff",
    borderColor: "#6b84ff",
    borderRadius: 32,
    borderWidth: 5,
    height: 64,
  },
});

export default SubmitButton;

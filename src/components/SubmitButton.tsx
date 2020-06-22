import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

interface SubmitButtonProps {
  buttonText: string;
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
      <View style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{props.buttonText}</Text>
      </View>
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
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SubmitButton;

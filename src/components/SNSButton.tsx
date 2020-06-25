import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

interface SNSButtonProps {
  onPress: () => void;
}

const SNSButton: React.FC<SNSButtonProps> = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="transparent">
      <View style={styles.SNSButton}>{props.children}</View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  SNSButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4665ff",
    borderColor: "#6b84ff",
    borderRadius: 32,
    borderWidth: 5,
    width: 64,
    height: 64,
  },
});

export default SNSButton;

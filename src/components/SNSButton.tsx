import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

interface SNSButtonProps {
  onPress: () => void;
}

const SNSButton: React.FC<SNSButtonProps> = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.container}
      underlayColor="transparent"
    >
      <View style={styles.SNSButton}>
        <Text style={styles.SNSButtonText}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
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
  SNSButtonText: {
    color: "#fff",
  },
});

export default SNSButton;

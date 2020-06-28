import React from "react";
import { StyleSheet, View } from "react-native";

const Title: React.FC = (props) => (
  <View style={styles.title}>{props.children}</View>
);

const styles = StyleSheet.create({
  title: {
    position: "absolute",
    top: 72,
    left: 24,
  },
});

export default Title;

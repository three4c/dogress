import React from "react";
import { StyleSheet, View } from "react-native";

const Title: React.FC = (props) => (
  <View style={styles.title}>{props.children}</View>
);

const styles = StyleSheet.create({
  title: {
    marginTop: 72,
    marginLeft: 24,
    textAlign: "left",
    width: "100%",
  },
});

export default Title;

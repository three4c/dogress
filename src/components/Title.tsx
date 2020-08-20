import React from "react";
import { StyleSheet, View } from "react-native";

const Title: React.FC = (props) => (
  <View style={styles.container}>
    {React.Children.map(props.children, (child, index) => (
      <View key={index}>{child}</View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 72,
    width: "100%",
  },
});

export default Title;

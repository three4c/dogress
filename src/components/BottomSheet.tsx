import React from "react";
import { StyleSheet, View, Dimensions, Animated, Easing } from "react-native";

const BottomSheet: React.FC = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    top: 264,
    width: "100%",
    height: "100%",
  },
});

export default BottomSheet;

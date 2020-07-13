import React from "react";
import { StyleSheet, View, Text } from "react-native";

const BottomSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#000", fontSize: 16 }}>Bottom Sheet Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomSheet;

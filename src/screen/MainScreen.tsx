import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <Text>メインスクリーン</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4665ff",
    flex: 1,
  },
});

export default MainScreen;

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import InputBox from "./src/components/InputBox";

const App = () => {
  return (
    <View style={styles.container}>
      <InputBox placeholder="hoge" onChangeText={() => console.log("hoge")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

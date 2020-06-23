import React from "react";
import { StyleSheet, View } from "react-native";

import InputBox from "./src/components/InputBox";
import SubmitButton from "./src/components/SubmitButton";
import SNSButton from "./src/components/SNSButton";

const App = () => {
  return (
    <View style={styles.container}>
      <InputBox placeholder="hoge" onChangeText={() => console.log("fuga")} />
      <SubmitButton buttonText="hoge" onPress={() => console.log("fuga")} />
      <SNSButton onPress={() => console.log("piyo")}>icon</SNSButton>
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

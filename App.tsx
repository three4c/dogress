import React from "react";
import { StyleSheet, View, Image } from "react-native";

import InputBox from "./src/components/InputBox";
import SubmitButton from "./src/components/SubmitButton";
import SNSButton from "./src/components/SNSButton";

const App = () => {
  return (
    <View style={styles.container}>
      <InputBox placeholder="hoge" onChangeText={() => console.log("fuga")} />
      <SubmitButton buttonText="hoge" onPress={() => console.log("fuga")} />
      <SNSButton onPress={() => console.log("piyo")}>
        <Image
          source={require("./assets/twitter.png")}
          resizeMode="contain"
          style={{ width: 24, height: 20 }}
        />
      </SNSButton>
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

import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SNSButton from "../components/SNSButton";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>アカウント作成</Text>
      <InputBox
        autoCapitalize="none"
        autoCorrect
        placeholder="ID"
        onChangeText={() => console.log("id")}
        style={styles.inputBoxId}
      />
      <InputBox
        autoCapitalize="none"
        autoCorrect
        secureTextEntry
        placeholder="パスワード"
        onChangeText={() => console.log("password")}
        style={styles.inputBoxPassword}
      />
      <SubmitButton
        buttonText="アカウントを作成する"
        onPress={() => console.log("Signup")}
      />
      <View style={styles.or}>
        <Text style={styles.orText}>or</Text>
      </View>
      <SNSButton onPress={() => console.log("piyo")}>
        <Image
          source={require("../../assets/twitter.png")}
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
    backgroundColor: "#4665ff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  topText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
  },
  inputBoxId: {
    marginBottom: 24,
  },
  inputBoxPassword: {
    marginBottom: 64,
  },
  or: {
    marginTop: 32,
    marginBottom: 32,
  },
  orText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SignupScreen;

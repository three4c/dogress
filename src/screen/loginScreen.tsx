import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SNSButton from "../components/SNSButton";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
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
        placeholder="Password"
        onChangeText={() => console.log("password")}
        style={styles.inputBoxPassword}
      />
      <SubmitButton
        buttonText="ログイン"
        onPress={() => console.log("login")}
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

export default LoginScreen;

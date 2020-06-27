import React from "react";
import { StyleSheet, View, Image } from "react-native";

import CustomText from "../components/CustomText";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SNSButton from "../components/SNSButton";

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomText color="#fff" size={24}>
          アカウント作成
        </CustomText>
      </View>
      <View style={styles.form}>
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
        <SubmitButton onPress={() => console.log("Signup")}>
          <CustomText color="#fff">アカウントを作成する</CustomText>
        </SubmitButton>
        <View style={styles.or}>
          <CustomText color="#fff">or</CustomText>
        </View>
        <SNSButton onPress={() => console.log("piyo")}>
          <Image
            source={require("../../assets/twitter.png")}
            resizeMode="contain"
            style={{ width: 24, height: 20 }}
          />
        </SNSButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#4665ff",
    flex: 1,
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  title: {
    position: "absolute",
    top: 72,
    left: 24,
  },
  form: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    bottom: 72,
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
});

export default SignupScreen;

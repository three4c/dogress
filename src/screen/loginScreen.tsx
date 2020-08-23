import React from "react";
import { StyleSheet, View, Image } from "react-native";

import CustomText from "../components/CustomText";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SNSButton from "../components/SNSButton";
import Title from "../components/Title";

import { NavigationProps } from "../types";

interface LoginScreenProps extends NavigationProps {}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  return (
    <View style={styles.container}>
      <Title>
        <CustomText color="#fff" size={24}>
          ログイン
        </CustomText>
      </Title>
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
        <SubmitButton onPress={() => navigationHandler("Main")}>
          <CustomText color="#fff">ログイン</CustomText>
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
    backgroundColor: "#4665ff",
    flex: 1,
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
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

export default LoginScreen;

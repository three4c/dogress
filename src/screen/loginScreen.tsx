import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { CommonActions } from "@react-navigation/native";
import firebase from "firebase";

import CustomText from "../components/CustomText";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import SNSButton from "../components/SNSButton";
import Title from "../components/Title";

import { NavigationProps } from "../types";
import { TouchableHighlight } from "react-native-gesture-handler";

interface LoginScreenProps extends NavigationProps {}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const [email, setemail] = useState("user1@sample.com");
  const [password, setPassword] = useState("user1user1");
  const [error, setError] = useState(false);

  const navigationHandler = (to: string) => {
    props.navigation.navigate(to);
  };

  const submitHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        );
      })
      .catch(() => setError(true));
  };

  console.log("debug", error);

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
          placeholder="メールアドレス"
          onChangeText={(text) => setemail(text)}
          value={email}
          style={styles.inputBoxId}
        />
        <InputBox
          autoCapitalize="none"
          autoCorrect
          secureTextEntry
          placeholder="パスワード"
          onChangeText={(text) => setPassword(text)}
          value={password}
          style={styles.inputBoxPassword}
        />
        <SubmitButton onPress={submitHandler}>
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
        <TouchableHighlight
          style={styles.account}
          underlayColor="transparent"
          onPress={() => navigationHandler("Signup")}
        >
          <CustomText color="#fff" size={14} type="bold">
            アカウントを作成する
          </CustomText>
        </TouchableHighlight>
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
  account: {
    marginTop: 64,
  },
});

export default LoginScreen;

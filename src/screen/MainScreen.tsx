import React from "react";
import { StyleSheet, View, Text } from "react-native";

import CustomText from "../components/CustomText";
import Title from "../components/Title";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Title>
          <CustomText color="#fff" size={24}>
            タスク
          </CustomText>
        </Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    backgroundColor: "#4665ff",
    height: 232,
  },
});

export default MainScreen;

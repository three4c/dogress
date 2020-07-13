import React from "react";
import { StyleSheet, View } from "react-native";

import BottomSheet from "../components/BottomSheet";
import CustomText from "../components/CustomText";
import Title from "../components/Title";

const MainScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Title>
          <CustomText color="#fff" size={24}>
            タスク
          </CustomText>
        </Title>
      </View>
      <BottomSheet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4665ff",
  },
});

export default MainScreen;

import React from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "../components/CustomText";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
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
      <BottomSheetSwiper>
        <View style={{ backgroundColor: "#f00", height: "100%" }} />
        <View style={{ backgroundColor: "#0f0", height: "100%" }} />
        <View style={{ backgroundColor: "#00f", height: "100%" }} />
      </BottomSheetSwiper>
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

import React from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "../components/CustomText";

interface CountBoadProps {
  remaining: number;
  done: number;
  progress: number;
}

const CountBoard: React.FC<CountBoadProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.count}>
        <CustomText type="bold" size={12} color="#fff">
          残り
        </CustomText>
        <CustomText size={32} color="#fff">
          {props.remaining}
        </CustomText>
      </View>
      <View style={styles.count}>
        <CustomText type="bold" size={12} color="#fff">
          完了
        </CustomText>
        <CustomText size={32} color="#fff">
          {props.done}
        </CustomText>
      </View>
      <View style={styles.count}>
        <CustomText type="bold" size={12} color="#fff">
          進行中
        </CustomText>
        <CustomText size={32} color="#fff">
          {props.progress}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  count: {
    alignItems: "center",
    marginHorizontal: 24,
  },
});

export default CountBoard;

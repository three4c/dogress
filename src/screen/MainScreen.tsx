import React from "react";
import { StyleSheet, View } from "react-native";

import CardList from "../components/CardList";
import CustomText from "../components/CustomText";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
import Title from "../components/Title";

/** @todo 後で消す */
import mockResponse from "../data/mock-response.json";

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
        <CardList
          title="残り"
          items={mockResponse.items.filter((item) => item.today)}
        />
        <CardList
          title="完了"
          items={mockResponse.items.filter((item) => item.doneTime)}
        />
        <CardList
          title="進行中"
          items={mockResponse.items.filter((item) => item.progress)}
        />
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

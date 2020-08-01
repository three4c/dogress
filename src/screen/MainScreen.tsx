import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import CardList from "../components/CardList";
import CustomText from "../components/CustomText";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
import Title from "../components/Title";

/** @todo 後で消す */
import mockResponse from "../data/mock-response.json";

const MainScreen = () => {
  const [isSwipeUp, setSwipeUp] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Title>
          <CustomText color="#fff" size={24}>
            タスク
          </CustomText>
        </Title>
      </View>
      <BottomSheetSwiper isSlide swipeUpFn={setSwipeUp}>
        <CardList
          title="残り"
          isSwipeUp={isSwipeUp}
          items={mockResponse.items.filter((item) => item.today)}
        />
        <CardList
          title="完了"
          isSwipeUp={isSwipeUp}
          items={mockResponse.items.filter((item) => item.doneTime)}
        />
        <CardList
          title="進行中"
          isSwipeUp={isSwipeUp}
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

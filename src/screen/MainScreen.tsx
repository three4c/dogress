import React, { useState } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";

import BottomSheet from "../components/BottomSheet";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
import CardList from "../components/CardList";
import CountBoard from "../components/CountBoard";
import CustomText from "../components/CustomText";
import CircleButton from "../components/CircleButton";
import Title from "../components/Title";

/** @todo 後で消す */
import mockResponse from "../data/mock-response.json";

const MainScreen = () => {
  const [isSwipeUp, setSwipeUp] = useState(false);
  const [isShow, setShow] = useState(false);
  const remaining = mockResponse.items.filter((item) => item.today);
  const done = mockResponse.items.filter((item) => item.doneTime);
  const progress = mockResponse.items.filter(
    (item) => item.progress !== undefined
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>
          <CustomText color="#fff" size={24}>
            タスク
          </CustomText>
        </Title>
      </View>
      <CountBoard
        remaining={remaining.length}
        done={done.length}
        progress={progress.length}
      />
      <BottomSheetSwiper swipeUpFn={setSwipeUp}>
        <CardList
          title="残り"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={remaining}
        />
        <CardList
          title="完了"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={done}
        />
        <CardList
          title="進行中"
          isSwipeUp={isSwipeUp}
          openFn={() => setShow(true)}
          items={progress}
        />
      </BottomSheetSwiper>
      <CircleButton openFn={() => console.log("hoge")} />
      <BottomSheet isShow={isShow} closeFn={() => setShow(false)}>
        <View style={styles.menu}>
          <CustomText type="bold" color="#e0245e">
            削除
          </CustomText>
        </View>
        <View style={styles.menu}>
          <CustomText type="bold">タスクを編集する</CustomText>
        </View>
        <TouchableHighlight
          style={styles.menu}
          underlayColor="transparent"
          onPress={() => setShow(false)}
        >
          <CustomText type="bold">キャンセル</CustomText>
        </TouchableHighlight>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4665ff",
  },
  title: {
    marginBottom: 48,
  },
  menu: {
    padding: 8,
  },
});

export default MainScreen;

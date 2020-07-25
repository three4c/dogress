import React from "react";
import { StyleSheet, View } from "react-native";

import CardList from "../components/CardList";
import CustomText from "../components/CustomText";
import BottomSheetSwiper from "../components/BottomSheetSwiper";
import Title from "../components/Title";

const dummyItems = [
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
  {
    deadline: "aaaa",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    today: true,
  },
  {
    deadline: "bbbb",
    description: "Lorem",
    doneTime: "19:00",
  },
  {
    deadline: "cccc",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. At debitis nemo nostrum. Animi voluptates consequuntur explicabo id accusamus, officia veniam quisquam nostrum quis iste sed modi, reiciendis et eum corrupti!",
    progress: 60,
  },
];

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
          items={dummyItems.filter((item) => item.today)}
        />
        <CardList
          title="完了"
          items={dummyItems.filter((item) => item.doneTime)}
        />
        <CardList
          title="進行中"
          items={dummyItems.filter((item) => item.progress)}
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

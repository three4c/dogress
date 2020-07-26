import React from "react";
import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";

import CustomText from "./CustomText";

interface CardListProps {
  title: string;
  items: {
    deadline: string;
    description: string;
    today?: boolean;
    doneTime?: string;
    progress?: number;
  }[];
}

const CardList: React.FC<CardListProps> = (props) => {
  return (
    <View>
      <View style={styles.title}>
        <CustomText>{props.title}</CustomText>
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {props.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.listItem,
              index === 0 && { marginTop: 16 },
              index === props.items.length - 1 && { marginBottom: 24 },
            ]}
          >
            <View style={styles.flexArea}>
              <View style={styles.deadline}>
                <CustomText size={10} type="bold" color="#ccc">
                  {item.deadline}
                </CustomText>
              </View>
              <TouchableHighlight
                underlayColor="transparent"
                style={styles.bullet}
                onPress={() => console.log(index)}
              >
                <React.Fragment>
                  <View style={styles.bulletItem} />
                  <View style={styles.bulletItem} />
                  <View style={styles.bulletItem} />
                </React.Fragment>
              </TouchableHighlight>
            </View>
            <View>
              <CustomText numberOfLines={2} ellipsizeMode="tail">
                {item.description}
              </CustomText>
            </View>
            {item.progress && <View />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: 24,
    marginBottom: 8,
  },
  deadline: {
    marginBottom: 8,
  },
  list: {
    /**
     * スクロール領域を確保する
     * 264 + 56 + 32.5 = 352.5
     */
    marginBottom: 352.5,
  },
  listItem: {
    marginBottom: 16,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    /** Android */
    elevation: 1,
  },
  bullet: {
    flexDirection: "row",
  },
  bulletItem: {
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginLeft: 2,
    width: 4,
    height: 4,
  },
  flexArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CardList;

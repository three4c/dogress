import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

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
      <ScrollView style={styles.list}>
        {props.items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.listItem,
              index === 0 && { marginTop: 16 },
              index === props.items.length - 1 && { marginBottom: 24 },
            ]}
          >
            <View style={styles.deadline}>
              <CustomText size={10} type="bold" color="#ccc">
                {item.deadline}
              </CustomText>
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
    marginLeft: 24,
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
});

export default CardList;

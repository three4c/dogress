import React from "react";
import { StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";

import CustomText from "./CustomText";

interface CardListProps {
  deadline: string;
  description: string;
  today?: boolean;
  doneTime?: string;
  progress?: number;
}

const CardList: React.FC<CardListProps> = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.flexArea}>
        <View style={styles.deadline}>
          <CustomText size={10} type="bold" color="#ccc">
            {props.deadline}
          </CustomText>
        </View>
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.bullet}
          onPress={() => console.log("hoge")}
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
          {props.description}
        </CustomText>
      </View>
      {props.progress && (
        <View style={styles.progressWrapper}>
          <View style={[styles.progress, { width: `${props.progress}%` }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  flexArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deadline: {
    marginBottom: 8,
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
  progressWrapper: {
    position: "relative",
    backgroundColor: "rgba(70, 101, 255, 0.24)",
    borderRadius: 3,
    overflow: "hidden",
    marginTop: 16,
    width: "100%",
    height: 6,
  },
  progress: {
    backgroundColor: "#4665ff",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
});

export default CardList;

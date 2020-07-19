import React from "react";
import { StyleSheet, View } from "react-native";

const Swiper: React.FC = (props) => {
  return (
    <View style={styles.container}>
      {React.Children.map(props.children, (child, index) => (
        <View key={index} style={styles.swiperItem}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  swiperItem: {
    padding: 24,
    width: "100%",
    height: "100%",
  },
});

export default Swiper;

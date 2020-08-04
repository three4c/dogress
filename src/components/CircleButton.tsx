import React from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

interface CircleButtonProps {
  openFn: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = (prosp) => {
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={prosp.openFn}
      underlayColor="transparent"
    >
      <View style={styles.circle}>
        <View
          style={[
            styles.plus,
            {
              width: 32,
              height: 4,
              transform: [{ translateX: -16 }, { translateY: -2 }],
            },
          ]}
        />
        <View
          style={[
            styles.plus,
            {
              width: 4,
              height: 32,
              transform: [{ translateX: -2 }, { translateY: -16 }],
            },
          ]}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
  },
  circle: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 32,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    /** Android */
    elevation: 1,
  },
  plus: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#4665ff",
    borderRadius: 2,
  },
});

export default CircleButton;

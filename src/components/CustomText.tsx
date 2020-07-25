import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

interface CustomTextProps {
  type?: "medium" | "bold";
  color?: string;
  size?: number;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

const CustomText: React.FC<CustomTextProps> = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const fn = async () => {
      await Font.loadAsync({
        "NotoSansJP-Medium": require("../../assets/fonts/NotoSansJP-Medium.otf"),
        "NotoSansJP-Bold": require("../../assets/fonts/NotoSansJP-Bold.otf"),
        "NotoSansJP-Black": require("../../assets/fonts/NotoSansJP-Black.otf"),
      });

      setFontLoaded(true);
    };

    fn();
  }, []);

  const setFontType = (type: string) => {
    switch (type) {
      case "medium":
        return "NotoSansJP-Medium";
      case "bold":
        return "NotoSansJP-Bold";
      default:
        return "NotoSansJP-Black";
    }
  };

  const fontOptions = {
    fontFamily: setFontType(props.type ? props.type : ""),
    fontSize: props.size ? props.size : 16,
    color: props.color ? props.color : "#333",
  };

  return fontLoaded ? (
    <Text
      style={fontOptions}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}
    >
      {props.children}
    </Text>
  ) : null;
};

export default CustomText;

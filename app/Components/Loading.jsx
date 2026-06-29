import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";

const Loading = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <Animated.Text
        style={{
          fontSize: 100,
          color: "white",
          transform: [{ rotate }],
        }}
      >
        ◡
      </Animated.Text>

      
    </View>
  );
};

export default Loading;
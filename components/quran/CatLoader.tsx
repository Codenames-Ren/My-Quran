import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

interface CatLoaderProps {
  size?: "small" | "medium" | "large";
}

export default function CatLoader({ size = "medium" }: CatLoaderProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  const sizes = {
    small: 80,
    medium: 120,
    large: 160,
  };

  const containerSize = sizes[size];

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    floatAnimation.start();

    return () => {
      floatAnimation.stop();
    };
  }, [floatAnim]);

  const floatInterpolate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View
      style={{
        width: containerSize,
        height: containerSize,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={require("@/assets/images/cat-loader.gif")}
        style={{
          width: containerSize * 0.8,
          height: containerSize * 0.8,
          transform: [{ translateY: floatInterpolate }],
        }}
        resizeMode="contain"
      />
    </View>
  );
}

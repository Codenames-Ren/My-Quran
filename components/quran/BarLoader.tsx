import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface BarLoaderProps {
  color?: string;
  size?: "small" | "medium" | "large";
}

export default function BarLoader({
  color = "#ffffff",
  size = "medium",
}: BarLoaderProps) {
  const anim1 = useRef(new Animated.Value(1)).current;
  const anim2 = useRef(new Animated.Value(1)).current;
  const anim3 = useRef(new Animated.Value(1)).current;

  const heights = {
    small: { base: 12, middle: 20 },
    medium: { base: 20, middle: 35 },
    large: { base: 28, middle: 48 },
  };

  const { base, middle } = heights[size];

  useEffect(() => {
    const createAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1.5,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 200,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.delay(400),
        ]),
      );
    };

    const animation1 = createAnimation(anim1, 0);
    const animation2 = createAnimation(anim2, 200);
    const animation3 = createAnimation(anim3, 400);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            height: base,
            backgroundColor: color,
            transform: [{ scaleY: anim1 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          styles.middleBar,
          {
            height: middle,
            backgroundColor: color,
            transform: [{ scaleY: anim2 }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bar,
          {
            height: base,
            backgroundColor: color,
            transform: [{ scaleY: anim3 }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    width: 3,
    borderRadius: 10,
  },
  middleBar: {
    marginHorizontal: 5,
  },
});

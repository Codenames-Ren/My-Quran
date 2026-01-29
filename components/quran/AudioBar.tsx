import { styles } from "@/src/styles/surah.styles";
import { QORI_LIST, QoriKey } from "@/src/utils/qori";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type Props = {
  isPlaying: boolean;
  progress: number;
  qori: QoriKey;
  onPlay(): void;
  onNextQori(): void;
};

export function AudioBar({
  isPlaying,
  progress,
  qori,
  onPlay,
  onNextQori,
}: Props) {
  const progressAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.audioBar}>
      <Text onPress={onPlay} style={styles.audioButton}>
        {isPlaying ? "⏸" : "▶️"}
      </Text>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[styles.progressFill, { width: progressWidth }]}
        />
      </View>
      <Text onPress={onNextQori} style={styles.qoriText}>
        {QORI_LIST[qori]}
      </Text>
    </View>
  );
}

import { styles } from "@/src/styles/surah.styles";
import { QORI_LIST, QoriKey } from "@/src/utils/qori";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type Props = {
  isPlaying: boolean;
  progress: number;
  qori: QoriKey;
  currentTime?: number;
  duration?: number;
  onPlay(): void;
  onNextQori(): void;
};

export function AudioBar({
  isPlaying,
  progress,
  qori,
  currentTime = 0,
  duration = 0,
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
  }, [progress, progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const showDuration = duration > 0;

  return (
    <View style={styles.audioBar}>
      <Text onPress={onPlay} style={styles.audioButton}>
        {isPlaying ? "⏸" : "▶️"}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </View>

        {showDuration && (
          <Text style={styles.durationText}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        )}
      </View>

      <Text onPress={onNextQori} style={styles.qoriText}>
        {QORI_LIST[qori]}
      </Text>
    </View>
  );
}

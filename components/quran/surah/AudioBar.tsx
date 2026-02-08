import { styles } from "@/src/styles/surah.styles";
import { QORI_LIST, QoriKey } from "@/src/utils/qori";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";

type Props = {
  isPlaying: boolean;
  isPaused?: boolean;
  progress: number;
  qori: QoriKey;
  currentTime?: number;
  duration?: number;
  isFullAudio?: boolean;
  onPlay(): void;
  onStop?(): void;
  onSeek?(seconds: number): void;
  onNextQori(): void;
};

export function AudioBar({
  isPlaying,
  isPaused = false,
  progress,
  qori,
  currentTime = 0,
  duration = 0,
  isFullAudio = false,
  onPlay,
  onStop,
  onSeek,
  onNextQori,
}: Props) {
  const progressAnim = useRef(new Animated.Value(progress)).current;
  const [trackWidth, setTrackWidth] = useState(300);

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

  // Simple seek on tap
  const handleSeek = (event: any) => {
    if (onSeek && duration > 0 && isFullAudio) {
      const { locationX } = event.nativeEvent;
      const newProgress = Math.max(0, Math.min(1, locationX / trackWidth));
      const newTime = newProgress * duration;
      onSeek(newTime);
    }
  };

  return (
    <View style={styles.audioBar}>
      {/* Play/Pause Button */}
      <Text onPress={onPlay} style={styles.audioButton}>
        {isPlaying && !isPaused ? "⏸" : "▶️"}
      </Text>

      {/* Stop Button (full audio only) */}
      {isFullAudio && onStop && (
        <Text onPress={onStop} style={[styles.audioButton, { marginRight: 8 }]}>
          ⏹
        </Text>
      )}

      <View style={styles.progressContainer}>
        {/* Progress Track */}
        <Pressable
          onLayout={(event) => {
            setTrackWidth(event.nativeEvent.layout.width);
          }}
          onPress={handleSeek}
          style={styles.progressTrack}
        >
          <Animated.View
            style={[styles.progressFill, { width: progressWidth }]}
          />
        </Pressable>

        {/* Duration Text */}
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

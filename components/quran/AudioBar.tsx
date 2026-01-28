import { styles } from "@/src/styles/surah.styles";
import { QORI_LIST, QoriKey } from "@/src/utils/qori";
import { Text, View } from "react-native";

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
  return (
    <View style={styles.audioBar}>
      <Text onPress={onPlay} style={styles.audioButton}>
        {isPlaying ? "⏸" : "▶️"}
      </Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <Text onPress={onNextQori} style={styles.qoriText}>
        {QORI_LIST[qori]}
      </Text>
    </View>
  );
}

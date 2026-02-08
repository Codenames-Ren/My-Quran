import { AudioBar } from "@/components/quran/surah/AudioBar";
import { styles } from "@/src/styles/surah.styles";
import { QoriKey } from "@/src/utils/qori";
import { Text, View } from "react-native";

type Props = {
  surah: any;
  qori: QoriKey;
  isPlayingFull: boolean;
  isPaused?: boolean;
  currentTime?: number;
  duration?: number;
  onPlayFull: () => void;
  onStopFull: () => void;
  onSeekFull: (seconds: number) => void;
  onNextQori: () => void;
};

export function SurahHeader({
  surah,
  qori,
  isPlayingFull,
  isPaused = false,
  currentTime = 0,
  duration = 0,
  onPlayFull,
  onStopFull,
  onSeekFull,
  onNextQori,
}: Props) {
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <View style={styles.header}>
      <Text style={styles.surahName}>{surah.nama}</Text>
      <Text style={styles.surahLatin}>{surah.namaLatin}</Text>
      <View style={styles.surahInfo}>
        <Text style={styles.surahInfoText}>
          Diturunkan di {surah.tempatTurun}
        </Text>
        <Text style={styles.surahInfoText}>•</Text>
        <Text style={styles.surahInfoText}>{surah.jumlahAyat} Ayat</Text>
      </View>
      <View style={styles.audioBarWrapper}>
        <AudioBar
          isPlaying={isPlayingFull}
          isPaused={isPaused}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          qori={qori}
          isFullAudio={true}
          onPlay={onPlayFull}
          onStop={onStopFull}
          onSeek={onSeekFull}
          onNextQori={onNextQori}
        />
      </View>
    </View>
  );
}

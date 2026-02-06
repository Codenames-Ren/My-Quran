import { AudioBar } from "@/components/quran/surah/AudioBar";
import { styles } from "@/src/styles/surah.styles";
import { QoriKey } from "@/src/utils/qori";
import { Text, View } from "react-native";

type Props = {
  surah: any;
  qori: QoriKey;
  isPlayingFull: boolean;
  onPlayFull: () => void;
  onNextQori: () => void;
};

export function SurahHeader({
  surah,
  qori,
  isPlayingFull,
  onPlayFull,
  onNextQori,
}: Props) {
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
          progress={0}
          qori={qori}
          onPlay={onPlayFull}
          onNextQori={onNextQori}
        />
      </View>
    </View>
  );
}

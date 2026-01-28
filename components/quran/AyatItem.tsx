import { styles } from "@/src/styles/surah.styles";
import { toArabicNumber } from "@/src/utils/arabic";
import { QoriKey } from "@/src/utils/qori";
import { Text, View } from "react-native";
import { AudioBar } from "./AudioBar";

type Props = {
  ayat: any;
  isPlaying: boolean;
  progress: number;
  qori: QoriKey;
  onPlay(): void;
  onNextQori(): void;
};

export function AyatItem({
  ayat,
  isPlaying,
  progress,
  qori,
  onPlay,
  onNextQori,
}: Props) {
  return (
    <View style={styles.ayatContainer}>
      <Text style={styles.arab}>
        {ayat.teksArab} ۝{toArabicNumber(ayat.nomorAyat)}
      </Text>

      <Text style={styles.latin}>{ayat.teksLatin}</Text>

      <Text style={styles.terjemahan}>
        {ayat.nomorAyat}. {ayat.teksIndonesia}
      </Text>

      <AudioBar
        isPlaying={isPlaying}
        progress={progress}
        qori={qori}
        onPlay={onPlay}
        onNextQori={onNextQori}
      />
    </View>
  );
}

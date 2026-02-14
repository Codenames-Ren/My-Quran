import { styles } from "@/src/styles/surah.styles";
import { toArabicNumber } from "@/src/utils/arabic";
import { QoriKey } from "@/src/utils/qori";
import { Text, View } from "react-native";
import { AudioBar } from "./AudioBar";

type Props = {
  ayat: any;
  isPlaying?: boolean;
  progress?: number;
  qori?: QoriKey;
  onPlay?: () => void;
  onNextQori?: () => void;
  highlighted?: boolean;
  readOnly?: boolean;
};

export function AyatItem({
  ayat,
  isPlaying = false,
  progress = 0,
  qori,
  onPlay,
  onNextQori,
  highlighted,
  readOnly = false,
}: Props) {
  const arabicText = `${ayat.teksArab} ۝${toArabicNumber(ayat.nomorAyat)}`;

  return (
    <View style={styles.ayatContainer}>
      <Text style={styles.arab}>
        {highlighted ? (
          <Text style={{ color: "#37BDF8" }}>{arabicText}</Text>
        ) : (
          arabicText
        )}
      </Text>

      <Text style={styles.latin}>{ayat.teksLatin}</Text>

      <Text style={styles.terjemahan}>
        {ayat.nomorAyat}. {ayat.teksIndonesia}
      </Text>

      {!readOnly && qori && onPlay && onNextQori && (
        <AudioBar
          isPlaying={isPlaying}
          progress={progress}
          qori={qori}
          onPlay={onPlay}
          onNextQori={onNextQori}
        />
      )}
    </View>
  );
}

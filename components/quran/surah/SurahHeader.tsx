import { styles } from "@/src/styles/surah.styles";
import { Text, View } from "react-native";

export function SurahHeader({ surah }: { surah: any }) {
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
    </View>
  );
}

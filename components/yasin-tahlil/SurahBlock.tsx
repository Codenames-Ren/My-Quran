import { getSurahForRead, SurahAyat } from "@/src/api/yasinTahlil";
import { styles } from "@/src/styles/yasinTahlil.styles";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export function SurahBlock({
  surahId,
  title,
}: {
  surahId: number;
  title?: string;
}) {
  const [ayat, setAyat] = useState<SurahAyat[]>([]);

  useEffect(() => {
    load();
  }, [surahId]);

  async function load() {
    const data = await getSurahForRead(surahId);
    setAyat(data);
  }

  return (
    <View style={styles.block}>
      {title && <Text style={styles.title}>{title}</Text>}

      {ayat.map((a) => (
        <View key={`${surahId}-${a.nomor}`} style={{ marginBottom: 16 }}>
          <Text style={styles.arab}>{a.arab}</Text>
          <Text style={styles.translation}>{a.translation}</Text>
        </View>
      ))}
    </View>
  );
}

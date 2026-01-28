import { QuranList } from "@/components/quran/QuranList";
import { getAllSurah } from "@/src/api/surat";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function QuranScreen() {
  const [surah, setSurah] = useState<any[]>([]);

  useEffect(() => {
    getAllSurah()
      .then((res) => setSurah(res.data))
      .catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <QuranList surah={surah} />
    </View>
  );
}

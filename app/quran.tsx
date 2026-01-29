import { QuranSearchController } from "@/components/quran/QuranSearchController";
import { getAllSurah } from "@/src/api/surat";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QuranScreen() {
  const [surah, setSurah] = useState<any[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getAllSurah()
      .then((res) => setSurah(res.data))
      .catch(console.error);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <QuranSearchController surah={surah} />
    </View>
  );
}

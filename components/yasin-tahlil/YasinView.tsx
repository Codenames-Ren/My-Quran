import { AyatItem } from "@/components/quran/surah/AyatItem";
import { getSurahDetail } from "@/src/api/surat";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export function YasinView() {
  const [surah, setSurah] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getSurahDetail(36);
    setSurah(res.data);
  }

  if (!surah) return null;

  return (
    <FlatList
      data={surah.ayat}
      keyExtractor={(item) => item.nomorAyat.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <>
          {surah.nomor !== 1 && surah.nomor !== 9 && (
            <View style={{ marginBottom: 32 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 28,
                  textAlign: "center",
                  fontFamily: "Scheherazade",
                  marginBottom: 8,
                }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </Text>
              <Text
                style={{
                  color: "#999",
                  fontSize: 16,
                  textAlign: "center",
                  fontStyle: "italic",
                  marginBottom: 4,
                }}
              >
                Bismillāhir-raḥmānir-raḥīm
              </Text>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
              </Text>
            </View>
          )}
        </>
      }
      renderItem={({ item }) => <AyatItem ayat={item} readOnly />}
    />
  );
}

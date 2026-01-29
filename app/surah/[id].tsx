import { AyatItem } from "@/components/quran/AyatItem";
import { SurahHeader } from "@/components/quran/SurahHeader";
import { getSurahDetail } from "@/src/api/surat";
import { useAyatAudio } from "@/src/hooks/useAyatAudio";
import { QoriKey, getNextQori } from "@/src/utils/qori";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [surah, setSurah] = useState<any>(null);
  const [qori, setQori] = useState<QoriKey>("05");

  const { playAyat, playingAyat, progress } = useAyatAudio();

  useEffect(() => {
    getSurahDetail(Number(id))
      .then((res) => {
        setSurah(res.data);
        navigation.setOptions({ title: res.data.namaLatin });
      })
      .catch(console.error);
  }, [id]);

  if (!surah) return null;

  function handlePlayAyat(index: number) {
    const ayat = surah.ayat[index];

    playAyat(ayat.audio[qori], ayat.nomorAyat, () => {
      const next = index + 1;
      if (next < surah.ayat.length) handlePlayAyat(next);
    });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#0F172A" }}
        contentContainerStyle={{ padding: 16 }}
      >
        <SurahHeader surah={surah} />

        {surah.nomor !== 1 && surah.nomor !== 9 && (
          <Text
            style={{
              color: "white",
              fontSize: 28,
              textAlign: "center",
              marginBottom: 32,
              fontFamily: "Scheherazade",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </Text>
        )}

        {surah.ayat.map((ayat: any, index: number) => (
          <AyatItem
            key={ayat.nomorAyat}
            ayat={ayat}
            isPlaying={playingAyat === ayat.nomorAyat}
            progress={playingAyat === ayat.nomorAyat ? progress : 0}
            qori={qori}
            onPlay={() => handlePlayAyat(index)}
            onNextQori={() => setQori(getNextQori(qori))}
          />
        ))}
      </ScrollView>
    </View>
  );
}

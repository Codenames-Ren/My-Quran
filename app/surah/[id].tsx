import { AyatItem } from "@/components/quran/surah/AyatItem";
import { AyatSearchController } from "@/components/quran/surah/AyatSearchController";
import { SurahHeader } from "@/components/quran/surah/SurahHeader";
import { getSurahDetail } from "@/src/api/surat";
import { useAyatAudio } from "@/src/hooks/useAyatAudio";
import { QoriKey, getNextQori } from "@/src/utils/qori";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [surah, setSurah] = useState<any>(null);
  const [qori, setQori] = useState<QoriKey>("05");
  const [highlight, setHighlightAyat] = useState<number | null>(null);

  const { playAyat, playingAyat, progress } = useAyatAudio();

  const listRef = useRef<FlatList>(null);

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

  function jumpToAyat(ayatNumber: number | null) {
    if (!ayatNumber) return;

    const index = surah.ayat.findIndex((a: any) => a.nomorAyat === ayatNumber);

    if (index >= 0) {
      listRef.current?.scrollToIndex({ index, animated: true });
      setHighlightAyat(ayatNumber);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0F172A",
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <AyatSearchController
        totalAyat={surah.jumlahAyat}
        onJumpToAyat={jumpToAyat}
      />

      <FlatList
        ref={listRef}
        data={surah.ayat}
        keyExtractor={(item) => item.nomorAyat.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <>
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
          </>
        }
        renderItem={({ item, index }) => (
          <AyatItem
            ayat={item}
            isPlaying={playingAyat === item.nomorAyat}
            progress={playingAyat === item.nomorAyat ? progress : 0}
            qori={qori}
            highlighted={highlight === item.nomorAyat}
            onPlay={() => handlePlayAyat(index)}
            onNextQori={() => setQori(getNextQori(qori))}
          />
        )}
      ></FlatList>
    </View>
  );
}

import BarLoader from "@/components/quran/BarLoader";
import CatLoader from "@/components/quran/CatLoader";
import { AyatItem } from "@/components/quran/surah/AyatItem";
import { AyatSearchController } from "@/components/quran/surah/AyatSearchController";
import { SurahHeader } from "@/components/quran/surah/SurahHeader";
import { getSurahDetail } from "@/src/api/surat";
import { useAyatAudio } from "@/src/hooks/useAyatAudio";
import { QoriKey, getNextQori } from "@/src/utils/qori";
import { cacheSurah, getCachedSurah } from "@/src/utils/surahCache";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qori, setQori] = useState<QoriKey>("05");
  const [highlight, setHighlightAyat] = useState<number | null>(null);

  const { playAyat, playingAyat, progress, currentTime, duration } =
    useAyatAudio(); // ← Tambahin currentTime & duration
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    loadSurah();
  }, [id]);

  async function loadSurah() {
    setLoading(true);

    const cached = await getCachedSurah(Number(id));
    if (cached) {
      setSurah(cached);
      navigation.setOptions({ title: cached.namaLatin });
      setLoading(false);
      return;
    }

    try {
      const res = await getSurahDetail(Number(id));
      setSurah(res.data);
      navigation.setOptions({ title: res.data.namaLatin });

      await cacheSurah(Number(id), res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handlePlayAyat(index: number) {
    const ayat = surah.ayat[index];
    playAyat(ayat.audio[qori], ayat.nomorAyat, () => {
      const next = index + 1;
      if (next < surah.ayat.length) handlePlayAyat(next);
    });
  }

  function handlePlayFullAyat() {
    if (!surah?.audioFull) return;
    playAyat(surah.audioFull[qori], 0);
  }

  function jumpToAyat(ayatNumber: number | null) {
    if (!ayatNumber || !surah) return;
    const index = surah.ayat.findIndex((a: any) => a.nomorAyat === ayatNumber);
    if (index >= 0) {
      setHighlightAyat(ayatNumber);

      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }, 100);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: loading ? "" : surah?.namaLatin || "",
          headerLeft: () =>
            loading ? (
              <View style={{ marginLeft: 16 }}>
                <BarLoader color="#10B981" size="small" />
              </View>
            ) : null,
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#0F172A",
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CatLoader size="large" />
            <Text style={{ color: "#94A3B8", marginTop: 10, fontSize: 16 }}>
              Memuat surah...
            </Text>
          </View>
        ) : (
          <>
            <AyatSearchController
              totalAyat={surah.jumlahAyat}
              onJumpToAyat={jumpToAyat}
            />
            <FlatList
              ref={listRef}
              data={surah.ayat}
              keyExtractor={(item) => item.nomorAyat.toString()}
              contentContainerStyle={{ padding: 16 }}
              onScrollToIndexFailed={(info) => {
                setTimeout(() => {
                  listRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                    viewPosition: 0.5,
                  });
                }, 500);
              }}
              initialNumToRender={surah.ayat.length}
              maxToRenderPerBatch={surah.ayat.length}
              ListHeaderComponent={
                <>
                  <SurahHeader
                    surah={surah}
                    qori={qori}
                    isPlayingFull={playingAyat === 0}
                    currentTime={playingAyat === 0 ? currentTime : 0}
                    duration={playingAyat === 0 ? duration : 0}
                    onPlayFull={handlePlayFullAyat}
                    onNextQori={() => setQori(getNextQori(qori))}
                  />
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
            />
          </>
        )}
      </View>
    </>
  );
}

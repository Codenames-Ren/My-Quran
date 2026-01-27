import { getSurahDetail } from "@/src/api/surat";
import { toArabicNumber } from "@/src/utils/arabic";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [surah, setSurah] = useState<any>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getSurahDetail(Number(id))
      .then((res: any) => {
        setSurah(res.data);
        navigation.setOptions({
          title: res.data.namaLatin,
        });
      })
      .catch(console.error);
  }, [id]);

  if (!surah) return null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0F172A" }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: Math.max(insets.bottom, 16) + 48,
      }}
    >
      {/* Header */}
      <View style={{ alignItems: "center", marginBottom: 32 }}>
        <Text
          style={{
            color: "white",
            fontSize: 32,
            marginBottom: 4,
            textAlign: "center",
          }}
        >
          {surah.nama}
        </Text>
        {/* Nama Latin */}
        <Text
          style={{
            color: "#C8D5E1",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          {surah.namaLatin}
        </Text>
        {/* Info Surah */}
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 20,
            backgroundColor: "#1E2938",
          }}
        >
          <Text
            style={{
              color: "#94A38B",
              fontSize: 12,
            }}
          >
            Diturunkan di {surah.tempatTurun}
          </Text>
          <Text
            style={{
              color: "#94A38B",
              fontSize: 12,
            }}
          >
            •
          </Text>
          <Text
            style={{
              color: "#94A38B",
              fontSize: 12,
            }}
          >
            {surah.jumlahAyat} Ayat
          </Text>
        </View>
      </View>
      {/* Basmalah */}
      {surah.nomor !== 1 && surah.nomor !== 9 && (
        <Text
          style={{
            color: "white",
            fontSize: 28,
            textAlign: "center",
            marginBottom: 32,
            lineHeight: 48,
            fontFamily: "Scheherazade",
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>
      )}
      {/* Ayat */}
      {surah.ayat.map((ayat: any) => (
        <View
          key={ayat.nomorAyat}
          style={{
            marginBottom: 28,
          }}
        >
          {/* Nomor Ayat */}
          <Text
            style={{
              color: "white",
              fontSize: 26,
              lineHeight: 48,
              textAlign: "right",
              marginBottom: 10,
              fontFamily: "Scheherazade",
            }}
          >
            {ayat.teksArab} ۝{toArabicNumber(ayat.nomorAyat)}
          </Text>
          {/* Latin */}
          <Text
            style={{
              color: "#94A3B8",
              marginBottom: 10,
              fontStyle: "italic",
            }}
          >
            {ayat.teksLatin}
          </Text>
          {/* Terjemahan */}
          <Text
            style={{
              color: "white",
              lineHeight: 22,
              marginBottom: 10,
            }}
          >
            {ayat.nomorAyat}. {ayat.teksIndonesia}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

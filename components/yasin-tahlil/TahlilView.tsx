import { AyatItem } from "@/components/quran/surah/AyatItem";
import { TahlilAyatItem } from "@/components/yasin-tahlil/TahlilAyatItem";
import { getSurahDetail } from "@/src/api/surat";
import { TAHLIL_FULL } from "@/src/data/tahlilData";
import { styles } from "@/src/styles/yasinTahlil.styles";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export function TahlilView() {
  const [surahMap, setSurahMap] = useState<Record<number, any>>({});

  useEffect(() => {
    loadSurah();
  }, []);

  async function loadSurah() {
    const needed = TAHLIL_FULL.filter((i) => i.type === "surah") as {
      surahId: number;
    }[];
    const uniqueIds = [...new Set(needed.map((i) => i.surahId))];
    const result: Record<number, any> = {};
    for (const id of uniqueIds) {
      const res = await getSurahDetail(id);
      result[id] = res.data;
    }
    setSurahMap(result);
  }

  function renderItem({ item }: any) {
    // TEXT DATA
    if (item.type === "text") {
      const isTitle = item.arab === item.latin && item.arti === "";
      if (isTitle) {
        return <Text style={styles.titleCenter}>{item.arab}</Text>;
      }

      return (
        <TahlilAyatItem
          arab={item.arab}
          latin={item.latin}
          arti={item.arti}
          ayatNumber={item.ayatNumber}
          style={styles.block}
        />
      );
    }

    // SURAH DATA (FROM API)
    if (item.type === "surah") {
      const surah = surahMap[item.surahId];
      if (!surah) return null;
      return (
        <FlatList
          data={surah.ayat}
          keyExtractor={(a) => `${item.surahId}-${a.nomorAyat}`}
          renderItem={({ item: ayat }) => <AyatItem ayat={ayat} readOnly />}
        />
      );
    }

    return null;
  }

  return (
    <FlatList
      data={TAHLIL_FULL}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

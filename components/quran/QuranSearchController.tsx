import { useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import { QuranList } from "./QuranList";

type Props = {
  surah: any[];
};

export function QuranSearchController({ surah }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return surah;

    const q = query.toLowerCase();

    return surah.filter((s) => {
      return (
        s.namaLatin.toLowerCase().includes(q) ||
        s.arti.toLowerCase().includes(q) ||
        `juz ${s.nomor}`.includes(q)
      );
    });
  }, [query, surah]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Cari Surah"
        placeholderTextColor="#64748B"
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: "#1E2938",
          color: "white",
          padding: 12,
          margin: 12,
          borderRadius: 12,
        }}
      />

      <QuranList surah={filtered} highlight={query} />
    </View>
  );
}

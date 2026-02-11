import { DoaListItem } from "@/src/api/doa";
import { useMemo, useState } from "react";
import { TextInput, View } from "react-native";
import { DoaList } from "./DoaList";

type Props = {
  doa: DoaListItem[];
};

export function DoaSearchController({ doa }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return doa;
    const q = query.toLowerCase();
    return doa.filter((d) => {
      return (
        d.nama.toLowerCase().includes(q) ||
        d.grup.toLowerCase().includes(q) ||
        d.id.toString().includes(q)
      );
    });
  }, [query, doa]);

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Cari Doa..."
        placeholderTextColor="#64748B"
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: "#1E293B",
          color: "white",
          padding: 12,
          margin: 12,
          borderRadius: 12,
        }}
      />
      <DoaList doa={filtered} highlight={query} />
    </View>
  );
}

import { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

type Props = {
  totalAyat: number;
  onJumpToAyat: (ayatNumber: number | null) => void;
};

export function AyatSearchController({ totalAyat, onJumpToAyat }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      onJumpToAyat(null);
      return;
    }

    const num = Number(query);

    if (!isNaN(num) && num >= 1 && num <= totalAyat) {
      onJumpToAyat(num);
    }
  }, [query, totalAyat]);

  return (
    <View style={{ padding: 12 }}>
      <TextInput
        placeholder={`Cari ayat (1 - ${totalAyat})`}
        placeholderTextColor="#64748B"
        value={query}
        onChangeText={setQuery}
        keyboardType="numeric"
        style={{
          backgroundColor: "#1E2938",
          color: "white",
          padding: 12,
          borderRadius: 12,
        }}
      />
    </View>
  );
}

import { getAllSurah } from "@/src/api/surat";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function QuranScreen() {
  const [surah, setSurah] = useState<any[]>([]);

  useEffect(() => {
    getAllSurah()
      .then((res: any) => setSurah(res.data))
      .catch(console.error);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <FlatList
        data={surah}
        keyExtractor={(item) => item.nomor.toString()}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/surah/[id]",
              params: { id: item.nomor.toString() },
            }}
            asChild
          >
            <Pressable>
              <Text
                style={{
                  color: "white",
                  padding: 16,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#334155",
                }}
              >
                {item.nomor}, {item.namaLatin}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

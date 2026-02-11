import { DoaSearchController } from "@/components/doa/DoaSearchController";
import CatLoader from "@/components/quran/CatLoader";
import { DoaListItem, getAllDoa } from "@/src/api/doa";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DoaScreen() {
  const [doa, setDoa] = useState<DoaListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadDoa();
  }, []);

  async function loadDoa() {
    setLoading(true);
    try {
      const res = await getAllDoa();
      setDoa(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
            Memuat doa-doa...
          </Text>
        </View>
      ) : (
        <DoaSearchController doa={doa} />
      )}
    </View>
  );
}

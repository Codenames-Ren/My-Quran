import { DoaContent } from "@/components/doa/DoaContent";
import BarLoader from "@/components/quran/BarLoader";
import CatLoader from "@/components/quran/CatLoader";
import { DoaDetail, getDoaById } from "@/src/api/doa";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DoaDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [doa, setDoa] = useState<DoaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoa();
  }, [id]);

  async function loadDoa() {
    setLoading(true);
    try {
      const res = await getDoaById(Number(id));
      setDoa(res.data);
      navigation.setOptions({ title: res.data.nama });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: loading ? "" : doa?.nama || "",
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
              Memuat doa...
            </Text>
          </View>
        ) : doa ? (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <DoaContent doa={doa} />
          </ScrollView>
        ) : null}
      </View>
    </>
  );
}

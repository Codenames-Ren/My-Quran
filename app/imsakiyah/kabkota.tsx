import BarLoader from "@/components/quran/BarLoader";
import CatLoader from "@/components/quran/CatLoader";
import { getKabKota } from "@/src/api/imsakiyah";
import { styles } from "@/src/styles/imsakiyah.styles";
import { saveLocation } from "@/src/utils/locationStorage";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function KabKotaScreen() {
  const { provinsi } = useLocalSearchParams<{ provinsi: string }>();
  const [kabkota, setKabkota] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    if (provinsi) {
      loadKabKota();
    }
  }, [provinsi]);

  async function loadKabKota() {
    setLoading(true);
    try {
      const res = await getKabKota(provinsi);
      setKabkota(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectKabKota(kabkotaName: string) {
    await saveLocation({
      provinsi,
      kabkota: kabkotaName,
    });

    // Navigate back to main screen
    router.replace("/imsakiyah");
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: loading ? "" : `Pilih Kab/Kota - ${provinsi}`,
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
              Memuat kab/kota...
            </Text>
          </View>
        ) : (
          <FlatList
            data={kabkota}
            keyExtractor={(item) => item}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectKabKota(item)}
                style={styles.item}
              >
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            )}
          />
        )}
      </View>
    </>
  );
}

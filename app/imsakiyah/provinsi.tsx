import BarLoader from "@/components/quran/BarLoader";
import CatLoader from "@/components/quran/CatLoader";
import { getProvinsi } from "@/src/api/imsakiyah";
import { styles } from "@/src/styles/imsakiyah.styles";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProvinsiScreen() {
  const [provinsi, setProvinsi] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    loadProvinsi();
  }, []);

  async function loadProvinsi() {
    setLoading(true);
    try {
      const res = await getProvinsi();
      setProvinsi(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectProvinsi(provinsiName: string) {
    router.replace({
      pathname: "/imsakiyah/kabkota",
      params: { provinsi: provinsiName },
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: loading ? "" : "Pilih Provinsi",
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
              Memuat provinsi...
            </Text>
          </View>
        ) : (
          <FlatList
            data={provinsi}
            keyExtractor={(item) => item}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectProvinsi(item)}
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

import { ImsakiyahSchedule } from "@/components/imsakiyah/ImsakiyahSchedule";
import CatLoader from "@/components/quran/CatLoader";
import { getJadwalImsakiyah, JadwalImsakiyah } from "@/src/api/imsakiyah";
import {
  autoDetectLocation,
  requestLocationPermission,
} from "@/src/utils/locationHelper";
import { loadLocation, saveLocation } from "@/src/utils/locationStorage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ImsakiyahScreen() {
  const [jadwal, setJadwal] = useState<JadwalImsakiyah[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    initializeLocation();
  }, []);

  async function initializeLocation() {
    setLoading(true);

    // Check saved location
    const savedLocation = await loadLocation();
    if (savedLocation) {
      await fetchJadwal(savedLocation.provinsi, savedLocation.kabkota);
      return;
    }

    // Request GPS permission
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLoading(false);
      Alert.alert(
        "Permission Ditolak",
        "Izinkan akses lokasi untuk mendeteksi otomatis, atau pilih lokasi manual.",
        [
          {
            text: "Pilih Manual",
            onPress: () => router.push("/imsakiyah/provinsi"),
          },
        ],
      );
      return;
    }

    // Auto-detect location
    const detectedLocation = await autoDetectLocation();
    if (detectedLocation) {
      await saveLocation(detectedLocation);
      await fetchJadwal(detectedLocation.provinsi, detectedLocation.kabkota);
    } else {
      setLoading(false);
      Alert.alert(
        "Gagal Mendeteksi Lokasi",
        "Silakan pilih lokasi secara manual.",
        [
          {
            text: "Pilih Lokasi",
            onPress: () => router.push("/imsakiyah/provinsi"),
          },
        ],
      );
    }
  }

  async function fetchJadwal(provinsi: string, kabkota: string) {
    try {
      const res = await getJadwalImsakiyah(provinsi, kabkota);
      setJadwal(res.data.imsakiyah);
      setLocationName(`${kabkota}, ${provinsi}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal memuat jadwal imsakiyah");
    } finally {
      setLoading(false);
    }
  }

  function handleChangeLocation() {
    router.replace("/imsakiyah/provinsi");
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
            Mendeteksi lokasi...
          </Text>
        </View>
      ) : jadwal.length > 0 ? (
        <>
          {/* Header Location */}
          <View
            style={{
              padding: 16,
              backgroundColor: "#1E293B",
              borderBottomWidth: 1,
              borderBottomColor: "#334155",
            }}
          >
            <Text style={{ color: "#94A3B8", fontSize: 12, marginBottom: 4 }}>
              Lokasi Anda
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
                {locationName}
              </Text>
              <Pressable onPress={handleChangeLocation}>
                <Text style={{ color: "#10B981", fontSize: 14 }}>Ganti</Text>
              </Pressable>
            </View>
          </View>

          <ImsakiyahSchedule jadwal={jadwal} />
        </>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Text style={{ color: "#94A3B8", fontSize: 16, textAlign: "center" }}>
            Belum ada jadwal. Silakan pilih lokasi terlebih dahulu.
          </Text>
          <Pressable
            onPress={handleChangeLocation}
            style={{
              marginTop: 16,
              backgroundColor: "#10B981",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
              Pilih Lokasi
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

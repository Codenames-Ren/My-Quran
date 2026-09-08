import CatLoader from "@/components/quran/CatLoader";
import { ShalatSchedule } from "@/components/shalat/ShalatSchedule";
import {
  getJadwalShalat,
  getKabKotaShalat,
  getProvinsiShalat,
  JadwalShalat,
} from "@/src/api/shalat";
import {
  autoDetectLocation,
  requestLocationPermission,
} from "@/src/utils/locationHelper";
import { loadLocation, saveLocation } from "@/src/utils/locationStorage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const shalatLocationApi = {
  getProvinsi: getProvinsiShalat,
  getKabKota: getKabKotaShalat,
};

export default function ShalatScreen() {
  const [jadwal, setJadwal] = useState<JadwalShalat[]>([]);
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
      await fetchJadwal(
        savedLocation.provinsi,
        savedLocation.kabkota,
      );

      return;
    }

    // Request GPS permission
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      setLoading(false);

      Alert.alert(
        "Izin Ditolak",
        "Izinkan akses lokasi untuk mendeteksi otomatis, atau pilih lokasi manual.",
        [
          {
            text: "Pilih Manual",
            onPress: () => router.push("/shalat/provinsi"),
          },
        ],
      );

      return;
    }

    // Auto-detect location
    const detectedLocation = await autoDetectLocation(
      shalatLocationApi,
    );

    if (detectedLocation) {
      await saveLocation(detectedLocation);

      await fetchJadwal(
        detectedLocation.provinsi,
        detectedLocation.kabkota,
      );
    } else {
      setLoading(false);

      Alert.alert(
        "Gagal Mendeteksi Lokasi",
        "Silakan pilih lokasi secara manual.",
        [
          {
            text: "Pilih Lokasi",
            onPress: () => router.push("/shalat/provinsi"),
          },
        ],
      );
    }
  }

  async function fetchJadwal(
    provinsi: string,
    kabkota: string,
  ) {
    try {
      const today = new Date();

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;
      const todayYear = today.getFullYear();

      const tomorrowDate = tomorrow.getDate();
      const tomorrowMonth = tomorrow.getMonth() + 1;
      const tomorrowYear = tomorrow.getFullYear();

      let jadwalHariIni: JadwalShalat[] = [];
      let jadwalBesok: JadwalShalat[] = [];

      // Ambil jadwal bulan ini
      const currentMonthResponse = await getJadwalShalat(
        provinsi,
        kabkota,
        todayMonth,
        todayYear,
      );

      jadwalHariIni = currentMonthResponse.data.jadwal.filter(
        (item) => item.tanggal === todayDate,
      );

      // Kalau besok masih di bulan yang sama,
      // tidak perlu request API lagi.
      if (
        tomorrowMonth === todayMonth &&
        tomorrowYear === todayYear
      ) {
        jadwalBesok = currentMonthResponse.data.jadwal.filter(
          (item) => item.tanggal === tomorrowDate,
        );
      } else {
        // Kalau besok sudah masuk bulan/tahun berikutnya,
        // ambil jadwal dari bulan berikutnya.
        const nextMonthResponse = await getJadwalShalat(
          provinsi,
          kabkota,
          tomorrowMonth,
          tomorrowYear,
        );

        jadwalBesok = nextMonthResponse.data.jadwal.filter(
          (item) => item.tanggal === tomorrowDate,
        );
      }

      setJadwal([
        ...jadwalHariIni,
        ...jadwalBesok,
      ]);

      setLocationName(`${kabkota}, ${provinsi}`);
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Error",
        "Gagal memuat jadwal shalat",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChangeLocation() {
    router.replace("/shalat/provinsi");
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

          <Text
            style={{
              color: "#94A3B8",
              marginTop: 10,
              fontSize: 16,
            }}
          >
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
            <Text
              style={{
                color: "#94A3B8",
                fontSize: 12,
                marginBottom: 4,
              }}
            >
              Lokasi Anda
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "600",
                }}
              >
                {locationName}
              </Text>

              <Pressable onPress={handleChangeLocation}>
                <Text
                  style={{
                    color: "#10B981",
                    fontSize: 14,
                  }}
                >
                  Ganti
                </Text>
              </Pressable>
            </View>
          </View>

          <ShalatSchedule jadwal={jadwal} />
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
          <Text
            style={{
              color: "#94A3B8",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Belum ada jadwal untuk hari ini atau besok.
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
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Pilih Lokasi
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

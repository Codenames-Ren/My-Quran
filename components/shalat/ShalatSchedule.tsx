import { JadwalShalat } from "@/src/api/shalat";
import { styles } from "@/src/styles/shalatSchedule.styles"
import { FlatList, Text, View } from "react-native";

type Props = {
  jadwal: JadwalShalat[];
};

type WaktuKey = Exclude<
  keyof JadwalShalat,
  "tanggal" | "tanggal_lengkap" | "hari" | "imsak"
>;

export function ShalatSchedule({ jadwal }: Props) {
  const waktuShalat: { key: WaktuKey; label: string }[] = [
    { key: "subuh", label: "Subuh" },
    { key: "terbit", label: "Terbit" },
    { key: "dhuha", label: "Dhuha" },
    { key: "dzuhur", label: "Dzuhur" },
    { key: "ashar", label: "Ashar" },
    { key: "maghrib", label: "Maghrib" },
    { key: "isya", label: "Isya" },
  ];

  return (
    <FlatList
      data={jadwal}
      keyExtractor={(item) => item.tanggal.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>
            {item.hari}, {item.tanggal_lengkap}
          </Text>

          <View style={styles.timeGrid}>
            {waktuShalat.map((waktu) => (
              <View key={waktu.key} style={styles.timeItem}>
                <Text style={styles.timeLabel}>{waktu.label}</Text>
                <Text style={styles.timeValue}>
                  {item[waktu.key]}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
}
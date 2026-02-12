import { JadwalImsakiyah } from "@/src/api/imsakiyah";
import { styles } from "@/src/styles/imsakiyahSchedule.styles";
import { FlatList, Text, View } from "react-native";

type Props = {
  jadwal: JadwalImsakiyah[];
};

type WaktuKey = Exclude<keyof JadwalImsakiyah, "tanggal">;

export function ImsakiyahSchedule({ jadwal }: Props) {
  const waktuShalat: { key: WaktuKey; label: string }[] = [
    { key: "imsak", label: "Imsak" },
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
      keyExtractor={(item) => item.tanggal.toString()} // wajib string
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>{item.tanggal} Ramadhan</Text>

          <View style={styles.timeGrid}>
            {waktuShalat.map((waktu) => (
              <View key={waktu.key} style={styles.timeItem}>
                <Text style={styles.timeLabel}>{waktu.label}</Text>
                <Text style={styles.timeValue}>{item[waktu.key]}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    />
  );
}

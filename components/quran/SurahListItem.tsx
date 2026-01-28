import { styles } from "@/src/styles/quran.styles";
import { toArabicNumber } from "@/src/utils/arabic";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  surah: any;
};

export function SurahListItem({ surah }: Props) {
  return (
    <Link
      href={{
        pathname: "/surah/[id]",
        params: { id: surah.nomor.toString() },
      }}
      asChild
    >
      <Pressable style={styles.item}>
        <Text style={styles.number}>{surah.nomor}</Text>

        <View style={styles.middle}>
          <Text style={styles.latin}>{surah.namaLatin}</Text>
          <Text style={styles.arti}>{surah.arti}</Text>
        </View>

        <Text style={styles.arab}>
          {surah.nama} ۝{toArabicNumber(surah.nomor)}
        </Text>
      </Pressable>
    </Link>
  );
}

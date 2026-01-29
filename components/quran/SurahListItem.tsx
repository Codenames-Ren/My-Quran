import { styles } from "@/src/styles/quran.styles";
import { toArabicNumber } from "@/src/utils/arabic";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  surah: any;
  highlight?: string;
};

function highlightText(text: string, query?: string) {
  if (!query) return text;

  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const index = lower.indexOf(q);

  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <Text style={{ color: "#38BDF8" }}>
        {text.slice(index, index + query.length)}
      </Text>
      {text.slice(index + query.length)}
    </>
  );
}

export function SurahListItem({ surah, highlight }: Props) {
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
          <Text style={styles.latin}>
            {highlightText(surah.namaLatin, highlight)}
          </Text>
          <Text style={styles.arti}>
            {highlightText(surah.arti, highlight)}
          </Text>
        </View>

        <Text style={styles.arab}>
          {surah.nama} ۝{toArabicNumber(surah.nomor)}
        </Text>
      </Pressable>
    </Link>
  );
}

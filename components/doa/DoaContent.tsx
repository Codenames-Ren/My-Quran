import { DoaDetail } from "@/src/api/doa";
import { styles } from "@/src/styles/doaDetail.styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  doa: DoaDetail;
};

export function DoaContent({ doa }: Props) {
  const [showTentang, setShowTentang] = useState(false);

  return (
    <View>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.nama}>{doa.nama}</Text>
        <Text style={styles.grup}>{doa.grup}</Text>
        {/* Tags */}
        {doa.tag && Array.isArray(doa.tag) && doa.tag.length > 0 && (
          <View style={styles.tagContainer}>
            {doa.tag.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Arab */}
      <Text style={styles.arab}>{doa.ar}</Text>

      {/* Latin */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latin</Text>
        <Text style={styles.latin}>{doa.tr}</Text>
      </View>

      {/* Terjemahan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Terjemahan</Text>
        <Text style={styles.terjemahan}>{doa.idn}</Text>
      </View>

      {/* Keterangan (Collapsible) */}
      {doa.tentang && (
        <View style={styles.section}>
          <Pressable
            onPress={() => setShowTentang(!showTentang)}
            style={styles.tentangHeader}
          >
            <Text style={styles.sectionTitle}>Keterangan</Text>
            <Text style={styles.toggleIcon}>{showTentang ? "▼" : "▶"}</Text>
          </Pressable>

          {showTentang && <Text style={styles.tentang}>{doa.tentang}</Text>}
        </View>
      )}
    </View>
  );
}

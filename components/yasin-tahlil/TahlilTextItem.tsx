import { styles } from "@/src/styles/surah.styles";
import { Text, View } from "react-native";

export function TahlilTextItem({
  arab,
  latin,
  arti,
}: {
  arab: string;
  latin: string;
  arti: string;
}) {
  return (
    <View style={styles.ayatContainer}>
      <Text style={styles.arab}>{arab}</Text>
      <Text style={styles.latin}>{latin}</Text>
      <Text style={styles.terjemahan}>{arti}</Text>
    </View>
  );
}

import { DoaListItem } from "@/src/api/doa";
import { styles } from "@/src/styles/doa.styles";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

type Props = {
  doa: DoaListItem[];
};

export function DoaList({ doa }: Props) {
  const router = useRouter();

  return (
    <FlatList
      data={doa}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/doa/${item.id}`)}
          style={styles.item}
        >
          <Text style={styles.number}>{item.id}</Text>
          <View style={styles.middle}>
            <Text style={styles.nama}>{item.nama}</Text>
            <Text style={styles.grup}>{item.grup}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

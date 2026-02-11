import { DoaListItem } from "@/src/api/doa";
import { styles } from "@/src/styles/doa.styles";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

type Props = {
  doa: DoaListItem[];
  highlight?: string;
};

const HIGHLIGHT_COLOR = "#38BDF8";

export function DoaList({ doa, highlight = "" }: Props) {
  const router = useRouter();

  const highlightText = (text: string, query?: string) => {
    if (!query) return text;

    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    const index = lower.indexOf(q);

    if (index === -1) return text;

    return (
      <>
        {text.slice(0, index)}
        <Text style={{ color: HIGHLIGHT_COLOR }}>
          {text.slice(index, index + query.length)}
        </Text>
        {text.slice(index + query.length)}
      </>
    );
  };

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
            <Text style={styles.nama}>
              {highlightText(item.nama, highlight)}
            </Text>

            <Text style={styles.grup}>
              {highlightText(item.grup, highlight)}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
}

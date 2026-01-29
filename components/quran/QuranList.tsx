import { FlatList } from "react-native";
import { SurahListItem } from "./SurahListItem";

type Props = {
  surah: any[];
  highlight?: string;
};

export function QuranList({ surah, highlight }: Props) {
  return (
    <FlatList
      data={surah}
      keyExtractor={(item) => item.nomor.toString()}
      renderItem={({ item }) => (
        <SurahListItem surah={item} highlight={highlight} />
      )}
    />
  );
}

import { FlatList } from "react-native";
import { SurahListItem } from "./SurahListItem";

type Props = {
  surah: any[];
};

export function QuranList({ surah }: Props) {
  return (
    <FlatList
      data={surah}
      keyExtractor={(item) => item.nomor.toString()}
      renderItem={({ item }) => <SurahListItem surah={item} />}
    />
  );
}

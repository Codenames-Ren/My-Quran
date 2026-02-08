import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DoaDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Detail doa {id} (coming soon)</Text>
    </View>
  );
}

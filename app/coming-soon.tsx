import { Text, View } from "react-native";

export default function ComingSoon() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0F172A",
      }}
    >
      <Text style={{ color: "white", fontSize: 20 }}>Coming Soon 🚧</Text>
    </View>
  );
}

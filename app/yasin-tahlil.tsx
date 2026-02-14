import { TahlilView } from "@/components/yasin-tahlil/TahlilView";
import { YasinView } from "@/components/yasin-tahlil/YasinView";
import { styles } from "@/src/styles/yasinTahlil.styles";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function YasinTahlilScreen() {
  const [tab, setTab] = useState<"yasin" | "tahlil">("yasin");
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.tabContainer}>
        <Tab
          label="Yasin"
          active={tab === "yasin"}
          onPress={() => setTab("yasin")}
        />
        <Tab
          label="Tahlil"
          active={tab === "tahlil"}
          onPress={() => setTab("tahlil")}
        />
      </View>

      {tab === "yasin" ? <YasinView /> : <TahlilView />}
    </View>
  );
}

function Tab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tab, active && styles.tabActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

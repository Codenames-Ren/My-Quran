import { useColorScheme } from "@/src/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Scheherazade: require("@/assets/fonts/Scheherazade-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar
          style="light"
          backgroundColor="#0F172A"
          translucent={false}
        />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0F172A",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="quran" options={{ title: "Al-Qur'an" }} />
          <Stack.Screen name="surah/[id]" />
          <Stack.Screen name="coming-soon" options={{ title: "Coming Soon" }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Scheherazade: require("@/assets/fonts/Scheherazade-Regular.ttf"),
  });

  useEffect(() => {
    async function setupNavBar() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#0F172A");
      await NavigationBar.setButtonStyleAsync("light");
    }
    setupNavBar();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const customTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#0F172A",
      card: "#0F172A",
      primary: "#0F172A",
    },
  };

  return (
    <SafeAreaProvider style={{ backgroundColor: "#0F172A" }}>
      <ThemeProvider value={customTheme}>
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
            headerTintColor: "#ffffff",
            contentStyle: {
              backgroundColor: "#0F172A",
            },
            presentation: "card",
            gestureEnabled: true,
            fullScreenGestureEnabled: false,
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

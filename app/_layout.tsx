import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "index",
};

const THEME_COLOR = "#0F172A";

const customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: THEME_COLOR,
    card: THEME_COLOR,
    primary: THEME_COLOR,
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Scheherazade: require("@/assets/fonts/Scheherazade-Regular.ttf"),
  });

  useEffect(() => {
    const setupNavBar = async () => {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync(THEME_COLOR);
      await NavigationBar.setButtonStyleAsync("light");
    };

    setupNavBar();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: THEME_COLOR }}>
      <ThemeProvider value={customTheme}>
        <StatusBar
          style="light"
          backgroundColor={THEME_COLOR}
          translucent={false}
        />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: THEME_COLOR },
            headerTintColor: "#ffffff",
            contentStyle: { backgroundColor: THEME_COLOR },
            presentation: "card",
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="quran" options={{ title: "Al-Qur'an" }} />
          <Stack.Screen name="surah/[id]" />
          <Stack.Screen name="doa" options={{ title: "Kumpulan Doa" }} />
          <Stack.Screen
            name="imsakiyah"
            options={{ title: "Jadwal Imsakiyah" }}
          />
          <Stack.Screen name="imsakiyah/provinsi" />
          <Stack.Screen name="imsakiyah/kabkota" />
          <Stack.Screen
            name="yasin-tahlil"
            options={{ title: "Yasin & Tahlil" }}
          />
          <Stack.Screen name="coming-soon" options={{ title: "Coming Soon" }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

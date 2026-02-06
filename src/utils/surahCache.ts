import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_PREFIX = "surah_cache_";

export async function getCachedSurah(surahId: number) {
  try {
    const cached = await AsyncStorage.getItem(CACHE_PREFIX + surahId);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
}

export async function cacheSurah(surahId: number, data: any) {
  try {
    await AsyncStorage.setItem(CACHE_PREFIX + surahId, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing cache:", error);
  }
}

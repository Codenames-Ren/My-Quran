import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserLocation } from "./locationHelper";

const LOCATION_KEY = "@user_location";

// Save location to AsyncStorage
export async function saveLocation(location: UserLocation) {
  try {
    await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(location));
  } catch (err) {
    console.error("Failed to save location : ", err);
  }
}

// Load Location from AsyncStorage
export async function loadLocation(): Promise<UserLocation | null> {
  try {
    const saved = await AsyncStorage.getItem(LOCATION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("Failed to load location : ", err);
    return null;
  }
}

// Clear Saved Location
export async function clearLocation() {
  try {
    await AsyncStorage.removeItem(LOCATION_KEY);
  } catch (err) {
    console.error("Failed to clear location : ", err);
  }
}

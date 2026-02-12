import * as Location from "expo-location";
import { getKabKota, getProvinsi } from "../api/imsakiyah";

export type UserLocation = {
  provinsi: string;
  kabkota: string;
};

// Request permission & get GPS location
export async function requestLocationPermission(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
}

// Get user current location
export async function getCurrentLocation() {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}

// Reverse geocoding - lat/long to city name
export async function reverseGeocode(latitude: number, longitude: number) {
  const results = await Location.reverseGeocodeAsync({ latitude, longitude });
  if (results.length > 0) {
    const location = results[0];
    return {
      city: location.city || location.subregion || "",
      region: location.region || "",
    };
  }
  return null;
}

// Auto-detect user location (Via GPS)
export async function autoDetectLocation(): Promise<UserLocation | null> {
  try {
    const coords = await getCurrentLocation();

    const geoResult = await reverseGeocode(coords.latitude, coords.longitude);

    if (!geoResult?.region) return null;

    const provinsiList = await getProvinsi();
    const provinsiData = provinsiList?.data;

    if (!provinsiData?.length) return null;

    const regionLower = geoResult.region.toLowerCase();

    const matchedProvinsi = provinsiData.find((prov) => {
      const provLower = prov.toLowerCase();
      return provLower.includes(regionLower) || regionLower.includes(provLower);
    });

    if (!matchedProvinsi) return null;

    const kabkotaList = await getKabKota(matchedProvinsi);
    const kabkotaData = kabkotaList?.data;

    if (!kabkotaData?.length) {
      return {
        provinsi: matchedProvinsi,
        kabkota: "",
      };
    }

    const cityLower = geoResult.city?.toLowerCase() ?? "";

    const matchedKabKota = kabkotaData.find((kab) => {
      const kabLower = kab.toLowerCase();
      return kabLower.includes(cityLower) || cityLower.includes(kabLower);
    });

    return {
      provinsi: matchedProvinsi,
      kabkota: matchedKabKota ?? kabkotaData[0] ?? "",
    };
  } catch (error) {
    console.error("Auto-detect location failed:", error);
    return null;
  }
}

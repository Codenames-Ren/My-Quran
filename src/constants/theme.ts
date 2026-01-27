import { Platform } from "react-native";

export const Colors = {
  background: "#0F172A", // dark blue-gray (background utama)
  surface: "#1E293B", // card / list item
  primary: "#2563EB", // biru (accent)
  text: "#FFFFFF", // teks utama
  muted: "#94A3B8", // teks sekunder
  border: "#334155", // divider
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', sans-serif",
    mono: "monospace",
  },
});

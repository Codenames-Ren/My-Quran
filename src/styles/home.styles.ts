import { Colors } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 6,
    marginBottom: 3,
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },

  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  subtitle: {
    color: Colors.muted,
    fontSize: 14,
    marginTop: 6,
  },

  divider: {
    width: 48,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    marginTop: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    textShadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(37, 99, 235, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 48,
    height: 48,
    tintColor: Colors.primary,
  },

  cardText: {
    color: Colors.text,
    fontSize: 15,
    marginTop: 4,
  },
});

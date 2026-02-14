import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  nama: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  grup: {
    color: "#10B981",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "#1E293B",
    borderRadius: 12,
  },
  arab: {
    color: "white",
    fontSize: 28,
    lineHeight: 48,
    textAlign: "center",
    marginBottom: 32,
    fontFamily: "Scheherazade",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  latin: {
    color: "#94A3B8",
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
  },
  terjemahan: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },
  tentangHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  toggleIcon: {
    color: "#10B981",
    fontSize: 12,
  },
  tentang: {
    color: "#94A38B",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#1E293B",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  tagText: {
    color: "#10B981",
    fontSize: 12,
  },
});

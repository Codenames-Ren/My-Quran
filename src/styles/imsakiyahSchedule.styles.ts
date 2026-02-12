import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dateCard: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  dateText: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  timeItem: {
    width: "47%",
    backgroundColor: "#0F172A",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  timeLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginBottom: 4,
  },
  timeValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

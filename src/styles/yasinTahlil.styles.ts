import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  tabContainer: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    overflow: "hidden",
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: "#10B981",
  },

  tabText: {
    color: "#94A3B8",
    fontWeight: "600",
  },

  tabTextActive: {
    color: "white",
  },

  block: {
    marginBottom: 28,
  },

  titleCenter: {
    color: "#38BDF8",
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 18,
    marginTop: 16,
    fontSize: 20,
  },

  arti: {
    color: "#CBD5F5",
    marginTop: 12,
    lineHeight: 22,
  },

  arab: {
    fontSize: 22,
    color: "white",
    textAlign: "right",
    marginBottom: 6,
  },

  latin: {
    color: "#94A3B8",
    marginTop: 12,
  },
});

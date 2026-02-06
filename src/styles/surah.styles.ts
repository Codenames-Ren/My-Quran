import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  surahName: {
    color: "white",
    fontSize: 32,
  },
  surahLatin: {
    color: "#C8D5E1",
    fontSize: 18,
    marginBottom: 10,
  },
  surahInfo: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#1E2938",
  },
  surahInfoText: {
    color: "#94A38B",
    fontSize: 12,
  },
  ayatContainer: {
    marginBottom: 28,
  },
  audioBarWrapper: {
    marginTop: 8,
    width: "80%",
  },
  arab: {
    color: "white",
    fontSize: 26,
    lineHeight: 48,
    textAlign: "right",
    marginBottom: 10,
    fontFamily: "Scheherazade",
  },
  latin: {
    color: "#94A3B8",
    marginBottom: 10,
    fontStyle: "italic",
  },
  terjemahan: {
    color: "white",
    lineHeight: 22,
    marginBottom: 10,
  },
  audioBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#1E2938",
  },
  audioButton: {
    color: "white",
    fontSize: 18,
    marginRight: 12,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#334155",
    marginRight: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#38BDF8",
    borderRadius: 2,
  },
  qoriText: {
    color: "#94A3B8",
    fontSize: 12,
  },
});

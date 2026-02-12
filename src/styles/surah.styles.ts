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
    color: "#10B981",
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
  progressContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 2,
  },
  durationText: {
    fontSize: 10,
    color: "#ffffff",
    marginTop: 4,
    textAlign: "center",
  },
  qoriText: {
    color: "#94A3B8",
    fontSize: 12,
  },
});

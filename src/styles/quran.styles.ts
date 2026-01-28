import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#334155",
  },

  number: {
    color: "white",
    fontSize: 18,
    width: 32,
    textAlign: "center",
    marginRight: 12,
  },

  middle: {
    flex: 1,
  },

  latin: {
    color: "white",
    fontSize: 16,
    marginBottom: 2,
  },

  arti: {
    color: "#94A3B8",
  },

  arab: {
    color: "white",
    fontSize: 18,
    textAlign: "right",
    fontFamily: "Scheherazade",
    marginLeft: 12,
  },
});

import { toArabicNumber } from "@/src/utils/arabic";
import { Text, View } from "react-native";

type Props = {
  arab: string;
  latin?: string;
  arti?: string;
  ayatNumber?: number;
  style?: any;
};

export function TahlilAyatItem({
  arab,
  latin,
  arti,
  ayatNumber,
  style,
}: Props) {
  const arabicText = ayatNumber
    ? `${arab} ۝${toArabicNumber(ayatNumber)}`
    : arab;

  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: "Scheherazade",
          fontSize: 28,
          color: "white",
          textAlign: "right",
          marginBottom: 8,
        }}
      >
        {arabicText}
      </Text>
      {latin && (
        <Text
          style={{
            fontSize: 16,
            color: "#999",
            marginBottom: 4,
            fontStyle: "italic",
          }}
        >
          {latin}
        </Text>
      )}
      {arti && (
        <Text
          style={{
            fontSize: 14,
            color: "#ccc",
          }}
        >
          {arti}
        </Text>
      )}
    </View>
  );
}

import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles as styles } from "../src/styles/home.styles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>My-Qur'an</Text>
        <Text style={styles.subtitle}>Baca • Dengar • Tadabbur</Text>
        <View style={styles.divider} />
      </View>

      {/* GRID MENU */}
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <Link href="/quran" asChild>
            <Pressable style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require("@/assets/icons/quran.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardText}>Al-Qur'an</Text>
            </Pressable>
          </Link>
          <Link href="/yasin-tahlil" asChild>
            <Pressable style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require("@/assets/icons/yasin.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardText}>Yasin & Tahlil</Text>
            </Pressable>
          </Link>
          <Link href="/imsakiyah" asChild>
            <Pressable style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require("@/assets/icons/ramadhan.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardText}>Jadwal Imsakiyah</Text>
            </Pressable>
          </Link>
          <Link href="/doa" asChild>
            <Pressable style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require("@/assets/icons/prayer.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardText}>Kumpulan Doa</Text>
            </Pressable>
          </Link>
        </View>

        {/* <View style={styles.gridRowCenter}>
          <Link href="/coming-soon" asChild>
            <Pressable style={styles.card}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require("@/assets/icons/mosque.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.cardText}>Jadwal Shalat</Text>
            </Pressable>
          </Link>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

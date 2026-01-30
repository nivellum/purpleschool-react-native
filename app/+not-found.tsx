import { Link, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Color, Typography } from "../shared/design/tokens";
import Button from "../shared/components/Button";

export default function Unmatched() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={require("../assets/images/unmatched.png")}
        />
      </View>
      <View>
        <Text style={styles.text}>Ооо... что-то пошло не так.</Text>
        <Text style={styles.text}>
          Попробуйте вернуться на главный экран приложения
        </Text>
      </View>
      <Link asChild href={"/"}>
        <Button asLink={true} title="На главный экран" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 50,
    padding: 35,
    overflow: "scroll",
  },
  image: {
    resizeMode: "contain",
    width: 204,
    height: 282.8,
    // borderWidth: 1,
    // borderColor: "#fff",
    // borderStyle: "solid",
  },
  text: {
    color: Color.white,
    fontFamily: Typography.fonts.semiBold,
    textAlign: "center",
  },
});

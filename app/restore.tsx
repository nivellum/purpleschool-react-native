import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import { Color } from "../shared/design/tokens";

export default function Restore() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link href={"/"}>
        <Text style={{ color: Color.white }}>Index</Text>
      </Link>
    </View>
  );
}

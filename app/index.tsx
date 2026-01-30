import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../shared/design/tokens";
import { useAtom } from "jotai";
import { userAtom } from "../entities/user/model/user.state";

export default function Index() {
  const [user] = useAtom(userAtom);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link href={"/logins"}>
        <Text style={{ color: Color.white }}>{user.profile?.name}</Text>
      </Link>
    </View>
  );
}

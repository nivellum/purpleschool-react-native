import { Text, View } from "react-native";
import Button from "../../shared/components/Button";
import { authAtom, logoutAtom } from "../../entities/auth/model/auth.state";
import { useAtomValue, useSetAtom } from "jotai";
import { Redirect } from "expo-router";

export default function CoursesScreen() {
  const auth = useAtomValue(authAtom);
  const logout = useSetAtom(logoutAtom);

  if (!auth.accessToken) return <Redirect href="/login" />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 40,
      }}
    >
      <Text style={{ color: "#fff" }}>Courses</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}

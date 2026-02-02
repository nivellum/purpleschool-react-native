import { SplashScreen, Stack, Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StackScreen } from "react-native-screens";
import { Color } from "../shared/design/tokens";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [loaded, error] = useFonts({
    FiraSansSemiBold: require("../assets/fonts/FiraSans-SemiBold.ttf"),
    FiraSansSemiBoldItalic: require("../assets/fonts/FiraSans-SemiBoldItalic.ttf"),
    FiraSansRegular: require("../assets/fonts/FiraSans-Regular.ttf"),
    FiraSansItalic: require("../assets/fonts/FiraSans-Light.ttf"),
  });

  useEffect(() => {
    if(loaded)
        SplashScreen.hideAsync();    
  }, [loaded]);

  useEffect(() => {
    if(error)
        throw error;
  }, [error]);

  if (!loaded) return null;

  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerBackTitleStyle: {},
            headerTitleStyle: { color: Color.white },
            headerShown: false,
            headerStyle: { backgroundColor: Color.background },
            contentStyle: {
              backgroundColor: Color.background,
              paddingTop: insets.top,
            },
          }}
        >
          <Stack.Screen name="course/index" />
          <Stack.Screen
            name="login"
            options={{ presentation: "transparentModal" }}
          />
        </Stack>
      </SafeAreaProvider>
    </>
  );
}

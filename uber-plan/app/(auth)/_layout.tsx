import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // <-- use expo-status-bar, not react-native
import "react-native-reanimated";

const Layout = () => {
  return (
    <>
      {/* This hides the status bar across the whole app */}
      <StatusBar hidden style="auto" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="sign-in" />
      </Stack>
    </>
  );
};

import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar"; // <-- use expo-status-bar, not react-native
import React from "react";

const Home = () => {
  {
    /* This hides the status bar across the whole app */
  }
  <StatusBar hidden style="auto" />;
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;

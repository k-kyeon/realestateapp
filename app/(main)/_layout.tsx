import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="recommended-listings"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="popular-listings" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;

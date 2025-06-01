import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null; // or splash screen
  }

  if (isSignedIn) {
    return <Redirect href={"/(main)/(tabs)/search"} />;
  }

  return <Redirect href="/(auth)/onboarding" />;
};

export default Page;

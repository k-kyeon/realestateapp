import { Redirect } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

const Page = () => {
  return <Redirect href="/(auth)/onboarding" />;
};

export default Page;

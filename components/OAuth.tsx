import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {
  const handleGoogleSignIn = async () => {};

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-5 gap-x-4">
        <View className="flex-1 h-[1px] bg-slate-700" />
        <Text className="text-lg font-MontserratRegular">Or</Text>
        <View className="flex-1 h-[1px] bg-slate-700" />
      </View>
      <CustomButton
        title="Sign in with Google"
        className="mt-5 w-full"
        LeftIcon={() => (
          <Image
            source={icons.googleicon}
            resizeMode="contain"
            className="w-5 h-5 mx-3.5"
          />
        )}
      />
    </View>
  );
};

export default OAuth;

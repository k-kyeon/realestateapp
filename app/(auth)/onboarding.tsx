import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const { width, height } = Dimensions.get("window");

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLast = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="flex w-full justify-end items-end px-5"
      >
        <Text className="text-black font-MontserratBold">Skip</Text>
      </TouchableOpacity>

      <Carousel
        width={width}
        height={height * 0.65}
        loop={false}
        data={onboarding}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View className="flex justify-center items-center px-4">
            <View className="w-full h-[76%]">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex justify-center items-center w-[250px] gap-2">
              <Text className="font-MontserratBold text-4xl">{item.title}</Text>
              <Text className="font-MontserratSemiBold text-xl text-center mb-4">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />

      <View className="flex flex-row justify-center items-center mb-8">
        {onboarding.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === activeIndex ? "bg-black w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      <CustomButton
        title={isLast ? "Get Started" : "Next"}
        onPress={() =>
          isLast
            ? router.replace("/(auth)/sign-up")
            : setActiveIndex((prevIndex) =>
                Math.min(prevIndex + 1, onboarding.length - 1),
              )
        }
        className="w-9/12 mb-8"
      />
    </SafeAreaView>
  );
};

export default Onboarding;

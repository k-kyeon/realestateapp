import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLast = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full justify-center items-center">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="flex w-full justify-end items-end p-6"
      >
        <Text className="text-black font-MontserratBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[7px] h-[7px] mx-1 bg-[#94a1a0] rounded-full" />
        }
        activeDot={
          <View className="w-[20px] h-[7px] mx-1 bg-[#343838] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
        paginationStyle={{
          bottom: 185,
        }}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex justify-center items-center">
            <View className="w-full h-[450px]">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <View className="justify-center items-center my-7 gap-5 w-[250px]">
              <Text className="font-MontserratBold text-4xl">{item.title}</Text>
              <Text className="font-MontserratSemiBold text-xl text-center">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLast ? "Get Started" : "Next"}
        onPress={() =>
          isLast
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-9/12 mb-8"
      />
    </SafeAreaView>
  );
};

export default Onboarding;

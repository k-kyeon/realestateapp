import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView className="flex h-full ">
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
          top: 210,
        }}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex justify-center items-center">
            <View className="w-full h-[450px] overflow-hidden">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>
            <View className="justify-center items-center my-7 gap-6 w-[250px]">
              <Text className="font-MontserratBold text-4xl">{item.title}</Text>
              <Text className="font-MontserratSemiBold text-xl text-center">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;

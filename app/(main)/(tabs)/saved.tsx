import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { usePropertyStore } from "@/store";
import { icons, images } from "@/constants";

const Saved = () => {
  const { likedProperties } = usePropertyStore();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5">
        <View className="flex justify-between my-3">
          <Text className="text-2xl font-MontserratBold">Saved Properties</Text>
        </View>
        {likedProperties.length === 0 ? (
          <>
            <View className="flex justify-center items-center mt-20">
              <Image
                source={images.saved}
                className="w-[300px] h-[300px]"
                resizeMode="contain"
              />
              <Text className="text-2xl font-MontserratSemiBold mt-2">
                No Saved Posts
              </Text>
              <Text className="text-xl font-MontserratMedium text-center mt-2">
                When you press the heart icon on the listing, it will be
                displayed here.
              </Text>
            </View>
          </>
        ) : (
          <View>
            {likedProperties.map((item) => (
              <View className="w-full  bg-white rounded-xl p-3 my-2">
                <View className="flex flex-row gap-x-2">
                  <View className="p-2 border rounded-md border-neutral-300 bg-neutral-200">
                    <Image
                      source={{ uri: item.images[0] }}
                      resizeMode="contain"
                      className="w-20 h-20"
                    />
                  </View>

                  <View className="flex-1 justify-between">
                    <View className="flex flex-row gap-1.5">
                      <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                        <Image
                          source={icons.bed}
                          resizeMode="contain"
                          className="w-4 h-4"
                        />
                        <Text className="text-md">{item.bedrooms} beds</Text>
                      </View>
                      <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                        <Image
                          source={icons.bathtub}
                          resizeMode="contain"
                          className="w-4 h-4"
                        />
                        <Text className="text-md">{item.bathrooms} baths</Text>
                      </View>
                    </View>

                    <Text className="text-xl font-MontserratLight text-cyan-800">
                      ${item.price}
                    </Text>
                    <Text
                      className="text-lg font-MontserratLight"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.address.street}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saved;

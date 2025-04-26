import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { usePropertyStore } from "@/store";
import { icons } from "@/constants";

const PopularListings = () => {
  const { type } = useLocalSearchParams();
  const { properties } = usePropertyStore();

  const filteredProperties = properties.filter(
    (property) =>
      property.propertyType?.toLowerCase() === type?.toString().toLowerCase(),
  );

  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <View className="px-5 py-2">
        <View className="flex-row justify-between mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text className="text-xl font-MontserratBold">{type}s</Text>

          <View className="w-5 h-5"></View>
        </View>
        <Text className="text-xl font-MontserratSemiBold">
          Popular listings
        </Text>

        <FlatList
          data={filteredProperties}
          keyExtractor={(item) => item.listingId}
          renderItem={({ item }) => (
            <View className="w-[50%] p-2">
              <TouchableOpacity className="w-full rounded-xl overflow-hidden">
                <Image
                  source={{ uri: item.images[0] }}
                  className="w-full h-52"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute top-4 right-4"
                  onPress={() => {
                    setLiked((prevLiked) => !prevLiked);
                  }}
                >
                  <Image
                    source={liked ? icons.heartFilled : icons.heartUnfilled}
                    className="w-8 h-8"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <Text className="text-lg font-MontserratMedium">
                ${item.price}
              </Text>
              <Text className="text-md font-MontserratLight">
                {item.address.city}
              </Text>
            </View>
          )}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default PopularListings;

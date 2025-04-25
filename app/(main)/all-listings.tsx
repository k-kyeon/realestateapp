import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { usePropertyStore } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants";

const AllListings = () => {
  const { type } = useLocalSearchParams();
  const { properties } = usePropertyStore();

  const filteredProperties = properties.filter(
    (property) =>
      property.propertyType?.toLowerCase() === type?.toString().toLowerCase(),
  );
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.leftArrow}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text>All {type} listings</Text>

        <View className="w-5 h-5"></View>
      </View>

      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.listingId}
        renderItem={({ item }) => (
          <TouchableOpacity className="">
            <View className="w-full h-[100px] border">
              <View className="">
                <Image
                  source={{ uri: item.images[0] }}
                  className="w-30 h-30"
                  resizeMode="contain"
                />

                <Text>{item.price}</Text>
                <Text>{item.address.city}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default AllListings;

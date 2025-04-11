import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const Home = () => {
  const propertyTypes = [
    "Apartments",
    "Villas",
    "Flats",
    "Condominiums",
    "Townhouses",
  ];

  const data = [
    {
      property_id: "12345",
      address: "4390 Jail Drive, Los Angeles, CA, USA",
      city: "Los Angeles",
      state: "CA",
      zip_code: "29292",
      property_image: "https://picsum.photos/200/300?random=1",
      property_type: "single_family",
      square_footage: 3000,
      bedrooms: 2,
      bathrooms: 2,
      estimated_price: 5000000,
      year_built: 2023,
    },
    {
      property_id: "23232",
      address: "4390 Jail Drive, Los Angeles, CA, USA",
      city: "Carlsbad",
      state: "CA",
      zip_code: "12451",
      property_image: "https://loremflickr.com/200/200?random=1",
      property_type: "condo",
      square_footage: 2000,
      bedrooms: 3,
      bathrooms: 3,
      estimated_price: 6500000,
      year_built: 2022,
    },
    {
      property_id: "63454",
      address: "4390 Jail Drive, Los Angeles, CA, USA",
      city: "Sacramento",
      state: "CA",
      zip_code: "76474",
      property_image: "https://loremflickr.com/200/200?random=1",
      property_type: "townhouse",
      square_footage: 3100,
      bedrooms: 3,
      bathrooms: 2,
      estimated_price: 3700000,
      year_built: 2021,
    },
  ];

  const [activePropertyType, setActivePropertyType] = useState("Apartments");

  return (
    <SafeAreaView className="flex">
      <View className="flex flex-row justify-center items-center">
        <Image
          source={icons.leftArrow}
          className="w-5 h-5"
          resizeMode="contain"
        />
        <Text>Feed</Text>
        <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
      </View>

      <View className="w-full p-5">
        <Text>Explore Now</Text>
        <FlatList
          data={propertyTypes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`border rounded-full py-2 px-3 ${
                activePropertyType === item ? "bg-[#b8c0d3]" : ""
              }`}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ columnGap: 8 }}
          horizontal
        />
      </View>

      <View>
        <View className="flex flex-row justify-between items-center">
          <Text>Recommended Homes</Text>
          <Text>See All</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View className="">
              <Image
                source={{ uri: item.property_image }}
                resizeMode="contain"
                className="w-100 h-80"
              />
              <View className="flex flex-row">
                <View className="flex flex-row border rounded-md justify-center items-center p-2 gap-2">
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    className="w-4 h-4"
                  />
                  <Text className="text-md">{item.bedrooms} beds</Text>
                </View>
                <View className="flex flex-row border rounded-md justify-center items-center p-2 gap-2">
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    className="w-4 h-4"
                  />
                  <Text className="text-md">{item.bathrooms} baths</Text>
                </View>
                <View className="flex flex-row border rounded-md justify-center items-center p-2 gap-2">
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    className="w-4 h-4"
                  />
                  <Text className="text-md">{item.square_footage} sq ft</Text>
                </View>
              </View>
              <Text>{item.estimated_price}</Text>
              <Text>{item.address}</Text>
            </View>
          )}
          keyExtractor={(item) => item?.property_id}
          contentContainerStyle={{ columnGap: 10 }}
          horizontal
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

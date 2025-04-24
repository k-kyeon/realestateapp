import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons } from "@/constants";
import { usePropertyStore } from "@/store";

const Home = () => {
  const propertyTypes = [
    "Apartment",
    "Villa",
    "Flat",
    "Condominium",
    "Townhouse",
    "Office",
  ];

  const data = [
    {
      property_id: "12345",
      address: "4390 Jail Drive, Los Angeles, CA, USA",
      city: "Los Angeles",
      state: "CA",
      zip_code: "29292",
      property_image: "https://loremflickr.com/200/200?random=1",
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
    {
      property_id: "63224",
      address: "4390 Jail Drive, Los Angeles, CA, USA",
      city: "Culver City",
      state: "CA",
      zip_code: "46574",
      property_image: "https://loremflickr.com/200/200?random=1",
      property_type: "duplex",
      square_footage: 2100,
      bedrooms: 2,
      bathrooms: 2.5,
      estimated_price: 1700000,
      year_built: 2011,
    },
  ];

  const [activePropertyType, setActivePropertyType] = useState("Apartment");

  const [liked, setLiked] = useState(false);

  const { properties, fetchMockProperties } = usePropertyStore();

  useEffect(() => {
    fetchMockProperties();
  }, [fetchMockProperties]);

  return (
    <SafeAreaView className="flex">
      <ScrollView className="mb-20">
        <View className="flex flex-row justify-between items-center px-5 py-2">
          <TouchableOpacity>
            <View className="border rounded-full border-slate-500">
              <Image
                source={icons.avatar}
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <Text className="font-MontserratBold text-2xl">Feed</Text>
          <TouchableOpacity>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="w-full p-5">
          <Text className="font-MontserratSemiBold text-xl mb-3">
            Explore Now
          </Text>
          <FlatList
            data={propertyTypes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`border rounded-xl py-2 px-3 ${
                  activePropertyType === item ? "bg-[#c8dade]" : ""
                }`}
                onPress={() => setActivePropertyType(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ columnGap: 8 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </View>

        <View className="mx-5">
          <View className="flex flex-row justify-between items-center py-3">
            <Text className="font-MontserratSemiBold text-lg">
              Recommended Homes
            </Text>
            <TouchableOpacity>
              <Text className="font-MontserratSemiBold text-lg">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={properties.slice(0, 3)}
            renderItem={({ item }) => (
              <TouchableOpacity className="rounded-xl">
                <View className="w-auto h-[355px] rounded-xl p-3 gap-y-2 bg-white">
                  <View className="relative-">
                    <View className="p-2 border border-neutral-300 rounded-md">
                      <Image
                        source={{ uri: item.images[0] }}
                        resizeMode="contain"
                        className="w-80 h-60"
                      />
                    </View>
                    <TouchableOpacity
                      className="absolute top-4 right-4 bg-white/70"
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
                  </View>
                  <View className="flex flex-row gap-1.5">
                    <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                      <Image
                        source={icons.bed}
                        resizeMode="contain"
                        className="w-4 h-4"
                      />
                      <Text className="text-md">{item.bedrooms} beds</Text>
                    </View>
                    <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                      <Image
                        source={icons.bathtub}
                        resizeMode="contain"
                        className="w-4 h-4"
                      />
                      <Text className="text-md">{item.bathrooms} baths</Text>
                    </View>
                    <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                      <Image
                        source={icons.home}
                        resizeMode="contain"
                        className="w-4 h-4"
                      />
                      <Text className="text-md">{item.square_ft} sq ft</Text>
                    </View>
                  </View>
                  <Text className="text-2xl font-MontserratRegular text-cyan-800">
                    ${item.price}
                  </Text>
                  <Text className="text-xl font-MontserratLight">
                    {item.address.street}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.listingId}
            contentContainerStyle={{ columnGap: 15 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />

          <View className="flex flex-row justify-between items-center py-3 mt-4">
            <Text className="font-MontserratSemiBold text-lg">
              Popular Homes
            </Text>
            <TouchableOpacity>
              <Text className="font-MontserratSemiBold text-lg">See All</Text>
            </TouchableOpacity>
          </View>

          {properties.map((item) => (
            <TouchableOpacity key={item.listingId} className="w-full">
              <View className="w-full h-[110px] bg-white rounded-xl p-3 my-2">
                <View className="flex flex-row gap-x-2">
                  <View className="p-2 border rounded-md border-neutral-300">
                    <Image
                      source={{ uri: item.images[1] }}
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

                    <Text className="text-xl font-MontserratThin text-cyan-800">
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
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

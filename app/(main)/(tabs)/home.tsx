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

  const [activePropertyType, setActivePropertyType] = useState("Apartments");

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
                  activePropertyType === item ? "bg-[#b8c0d3]" : ""
                }`}
                onPress={() => setActivePropertyType(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ columnGap: 8 }}
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
            data={data.slice(0, 3)}
            renderItem={({ item }) => (
              <TouchableOpacity className="rounded-xl">
                <View className="w-auto h-[420px] border rounded-xl p-3 gap-y-2">
                  <View className="p-2 border rounded-md">
                    <Image
                      source={{ uri: item.property_image }}
                      resizeMode="contain"
                      className="w-80 h-80"
                    />
                  </View>
                  <View className="flex flex-row gap-1.5">
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
                      <Text className="text-md">
                        {item.square_footage} sq ft
                      </Text>
                    </View>
                  </View>
                  <Text className="text-2xl font-MontserratBold">
                    ${item.estimated_price}
                  </Text>
                  <Text className="text-2xl font-MontserratLight">
                    {item.address}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.property_id}
            contentContainerStyle={{ columnGap: 10 }}
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

          {data.map((item) => (
            <TouchableOpacity key={item.property_id} className="w-full">
              <View className="w-full h-[110px] border rounded-xl p-3 my-2">
                <View className="flex flex-row gap-x-2">
                  <View className="p-2 border rounded-md">
                    <Image
                      source={{ uri: item.property_image }}
                      resizeMode="contain"
                      className="w-20 h-20"
                    />
                  </View>

                  <View className="flex-1 justify-between">
                    <View className="flex flex-row gap-1.5">
                      <View className="flex flex-row border rounded-md justify-center items-center p-1 gap-2">
                        <Image
                          source={icons.home}
                          resizeMode="contain"
                          className="w-4 h-4"
                        />
                        <Text className="text-md">{item.bedrooms} beds</Text>
                      </View>
                      <View className="flex flex-row border rounded-md justify-center items-center p-1 gap-2">
                        <Image
                          source={icons.home}
                          resizeMode="contain"
                          className="w-4 h-4"
                        />
                        <Text className="text-md">{item.bathrooms} baths</Text>
                      </View>
                    </View>

                    <Text className="text-xl font-MontserratBold">
                      ${item.estimated_price}
                    </Text>
                    <Text
                      className="text-lgl font-MontserratLight"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.address}
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

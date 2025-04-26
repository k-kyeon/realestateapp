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
import { icons, images } from "@/constants";
import { usePropertyStore } from "@/store";
import { router } from "expo-router";

const Home = () => {
  const propertyTypes = [
    "Apartment",
    "Villa",
    "Flat",
    "Condominium",
    "Townhouse",
    "Office",
  ];

  const [activePropertyType, setActivePropertyType] = useState("Apartment");

  const [liked, setLiked] = useState(false);

  const { properties, fetchMockProperties } = usePropertyStore();

  const filteredProperties = properties.filter(
    (property) =>
      property.propertyType?.toLowerCase() === activePropertyType.toLowerCase(),
  );

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
          {filteredProperties.length === 0 ? (
            <View className="my-16 items-center">
              <Image
                source={images.fallback}
                className="w-[200px] h-[200px]"
                resizeMode="contain"
              />
              <Text className="text-2xl font-MontserratRegular">
                No results found for
              </Text>
              <Text className="text-2xl font-MontserratRegular">
                "{activePropertyType}"
              </Text>
            </View>
          ) : (
            <>
              <View className="flex flex-row justify-between items-center py-3">
                <Text className="font-MontserratSemiBold text-lg">
                  Recommended Homes
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      `/recommended-listings?type=${activePropertyType}`,
                    )
                  }
                >
                  <Text className="font-MontserratSemiBold text-lg">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={filteredProperties.slice(0, 3)}
                renderItem={({ item }) => (
                  <TouchableOpacity className="rounded-xl">
                    <View className="w-auto h-[355px] rounded-xl p-3 gap-y-2 bg-white">
                      <View className="">
                        <View className="p-2 border border-neutral-300 rounded-md bg-neutral-200">
                          <Image
                            source={{ uri: item.images[0] }}
                            resizeMode="cover"
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
                            source={
                              liked ? icons.heartFilled : icons.heartUnfilled
                            }
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
                          <Text className="text-md">
                            {item.bathrooms} baths
                          </Text>
                        </View>
                        <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                          <Image
                            source={icons.home}
                            resizeMode="contain"
                            className="w-4 h-4"
                          />
                          <Text className="text-md">
                            {item.square_ft} sq ft
                          </Text>
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
                <TouchableOpacity
                  onPress={() =>
                    router.push(`/popular-listings?type=${activePropertyType}`)
                  }
                >
                  <Text className="font-MontserratSemiBold text-lg">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              {filteredProperties.slice(0, 3).map((item) => (
                <TouchableOpacity key={item.listingId} className="w-full">
                  <View className="w-full h-[110px] bg-white rounded-xl p-3 my-2">
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
                            <Text className="text-md">
                              {item.bedrooms} beds
                            </Text>
                          </View>
                          <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                            <Image
                              source={icons.bathtub}
                              resizeMode="contain"
                              className="w-4 h-4"
                            />
                            <Text className="text-md">
                              {item.bathrooms} baths
                            </Text>
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
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
import { useUser } from "@clerk/clerk-expo";
import { LoopNetProperty } from "@/types/type";

const Home = () => {
  const { user } = useUser();
  const propertyTypes = [
    "Apartments",
    "Villa",
    "Flat",
    "Condominium",
    "Townhouse",
    "Office",
  ];

  const [activePropertyType, setActivePropertyType] = useState("Apartment");

  const {
    properties,
    fetchMockProperties,
    fetchProperties,
    likedProperties,
    likeProperty,
    unlikeProperty,
  } = usePropertyStore();

  // const filteredProperties = properties.filter(
  //   (property) =>
  //     property.propertyFacts?.propertySubtype?.toLowerCase() ===
  //     activePropertyType.toLowerCase(),
  // );

  useEffect(() => {
    fetchProperties("11854"); // Example: 41096 = New York City ID
  }, [fetchProperties]);

  return (
    <SafeAreaView className="flex">
      <ScrollView className="mb-20">
        <View className="flex flex-row justify-between items-center px-5 py-2">
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <View className="border rounded-full border-slate-500">
              <Image
                source={{ uri: user?.imageUrl }}
                className="w-10 h-10 rounded-full"
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
          {properties.length === 0 ? (
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
                  Recommended Properties
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

              {console.log("Properties data: ", properties)}

              <FlatList
                data={properties?.filter(
                  (p): p is LoopNetProperty => !!p.listingId,
                )}
                keyExtractor={(item, index) =>
                  item?.listingId?.toString() ?? `property-${index}`
                }
                renderItem={({ item }) => {
                  // const isLiked = likedProperties.some(
                  //   (p) => p.listingId === item.listingId,
                  // );

                  return (
                    <TouchableOpacity
                      className="rounded-xl"
                      onPress={() =>
                        router.push({
                          pathname: "/(main)/listing-details/[id]",
                          params: { id: item.listingId.toString() },
                        })
                      }
                    >
                      <View className="w-auto h-[355px] rounded-xl p-3 gap-y-2 bg-white">
                        <View className="">
                          <View className="p-2 border border-neutral-300 rounded-md bg-neutral-200">
                            <Image
                              source={{ uri: item.carousel?.[0]?.url }}
                              resizeMode="cover"
                              className="w-80 h-60"
                            />
                          </View>
                        </View>
                        <View className="flex flex-row gap-1.5">
                          <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                            <Image
                              source={icons.bed}
                              resizeMode="contain"
                              className="w-4 h-4"
                            />
                            <Text className="text-md">
                              {item.saleSummary?.numberOfBeds ?? "N/A"} beds
                            </Text>
                          </View>
                          <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                            <Image
                              source={icons.bathtub}
                              resizeMode="contain"
                              className="w-4 h-4"
                            />
                            <Text className="text-md">{"N/A"} baths</Text>
                          </View>
                          <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
                            <Image
                              source={icons.size}
                              resizeMode="contain"
                              className="w-4 h-4"
                            />
                            <Text className="text-md">
                              {item.propertyFacts?.buildingSize ?? "N/A"} sq ft
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row justify-between items-center mx-2">
                          <View>
                            <Text className="text-2xl font-MontserratRegular text-cyan-800">
                              ${item.saleSummary?.auction?.startBid ?? "N/A"}
                            </Text>
                            <Text className="text-xl font-MontserratLight">
                              {item.address}
                            </Text>
                          </View>
                          <TouchableOpacity
                            className="bg-transparent"
                            onPress={() => {
                              // if (isLiked) {
                              //   unlikeProperty(item.listingId);
                              // } else {
                              //   likeProperty(item);
                              // }
                            }}
                          >
                            <Image
                              source={
                                // isLiked
                                //   ? icons.heartFilled
                                //   : icons.heartUnfilled
                                icons.heartFilled
                              }
                              className="w-8 h-8"
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{ columnGap: 15 }}
                showsHorizontalScrollIndicator={false}
                horizontal
              />

              <View className="flex flex-row justify-between items-center py-3 mt-4">
                <Text className="font-MontserratSemiBold text-lg">
                  Popular Properties
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

              {properties
                ?.filter((item): item is LoopNetProperty => !!item?.listingId)
                .map((item) => {
                  // const isLiked = likedProperties.some(
                  //   (p) => p.listingId === item.listingId,
                  // );
                  return (
                    <TouchableOpacity
                      key={item.listingId.toString()}
                      className="w-full"
                      onPress={() =>
                        router.push({
                          pathname: "/(main)/listing-details/[id]",
                          params: { id: item.listingId.toString() },
                        })
                      }
                    >
                      <View className="w-full h-[110px] bg-white rounded-xl p-3 my-2">
                        <View className="flex flex-row gap-x-2">
                          <View className="p-2 border rounded-md border-neutral-300 bg-neutral-200">
                            <Image
                              source={{ uri: item.carousel?.[0]?.url }}
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
                                  {item.saleSummary?.numberOfBeds ?? "N/A"} beds
                                </Text>
                              </View>
                              <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                                <Image
                                  source={icons.bathtub}
                                  resizeMode="contain"
                                  className="w-4 h-4"
                                />
                                <Text className="text-md">{"N/A"} baths</Text>
                              </View>
                            </View>

                            <Text className="text-xl font-MontserratLight text-cyan-800">
                              ${item.saleSummary?.auction?.startBid ?? "N/A"}
                            </Text>
                            <Text
                              className="text-lg font-MontserratLight"
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.address}
                            </Text>
                          </View>

                          <TouchableOpacity
                            className="bg-transparent mr-1"
                            onPress={() => {
                              // if (isLiked) {
                              //   unlikeProperty(item.listingId);
                              // } else {
                              //   likeProperty(item);
                              // }
                            }}
                          >
                            <Image
                              source={
                                // isLiked ? icons.heartFilled : icons.heartUnfilled
                                icons.heartFilled
                              }
                              className="w-8 h-8"
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

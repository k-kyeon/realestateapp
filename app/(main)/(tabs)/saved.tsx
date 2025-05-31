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
              <View
                key={item.listingId}
                className="w-full bg-white rounded-xl p-3 my-2"
              >
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
                      {item.saleSummary?.numberOfStories && (
                        <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                          <Image
                            source={icons.stories}
                            resizeMode="contain"
                            className="w-4 h-4"
                          />
                          <Text className="text-md">
                            {item.saleSummary?.numberOfStories}{" "}
                            {item.saleSummary?.numberOfStories === "1"
                              ? "story"
                              : "stories"}
                          </Text>
                        </View>
                      )}
                      {item.propertyFacts?.buildingSize && (
                        <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                          <Image
                            source={icons.size}
                            resizeMode="contain"
                            className="w-4 h-4"
                          />
                          <Text className="text-md">
                            {item.propertyFacts?.buildingSize} sq ft
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text className="text-xl font-MontserratLight text-cyan-800">
                      {item.propertyFacts?.price ?? "Price N/A"}
                    </Text>

                    {(item.address || item.location) && (
                      <Text
                        className="text-lg font-MontserratLight"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.address} {item.location}
                      </Text>
                    )}
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

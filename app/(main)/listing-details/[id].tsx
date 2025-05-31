import { icons } from "@/constants";
import { usePropertyStore } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ListingDetails = () => {
  const { id } = useLocalSearchParams();
  const { properties, likeProperty, unlikeProperty, likedProperties } =
    usePropertyStore();

  const property = properties.find((p) => p.listingId.toString() === id);

  if (!property) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-4">Loading property details...</Text>
      </View>
    );
  }
  const isLiked = likedProperties.some(
    (p) => p.listingId === property.listingId,
  );

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="">
        <View className="flex-row justify-between px-5 my-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text className="font-MontserratBold text-xl">{"USA"}</Text>
          <TouchableOpacity
            className="bg-transparent"
            onPress={() => {
              if (isLiked) {
                unlikeProperty(property.listingId);
              } else {
                likeProperty(property);
              }
            }}
          >
            <Image
              source={isLiked ? icons.heartFilled : icons.heartUnfilled}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="px-3 py-2 mx-2 my-3">
          <Image
            source={{ uri: property.carousel?.[0]?.url }}
            className="w-full h-[360px] rounded-xl mb-2"
            resizeMode="cover"
          />

          <View className="flex-row justify-between mb-2">
            <Text className="text-xl font-MontserratSemiBold">
              {property.propertyType}
            </Text>

            <Text className="text-lg font-MontserratRegular text-slate-800">
              Listed on Dec. 24, 2020
            </Text>
          </View>

          <Text className="text-3xl font-MontserratBold text-cyan-800">
            {property.propertyFacts?.price ?? "N/A"}
          </Text>

          <Text className="text-xl font-MontserratBold text-black-800 mt-2">
            {property.title}
          </Text>

          <Text className="text-xl font-MontserratSemiBold text-black-800 mb-3">
            {(property.address || property.location) && (
              <Text
                className="text-lg font-MontserratLight"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {property.address} {property.location}
              </Text>
            )}
          </Text>

          <View className="flex flex-row gap-1.5">
            {property.saleSummary?.numberOfStories && (
              <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                <Image
                  source={icons.stories}
                  resizeMode="contain"
                  className="w-4 h-4"
                />
                <Text className="text-md">
                  {property.saleSummary?.numberOfStories}{" "}
                  {property.saleSummary?.numberOfStories === "1"
                    ? "story"
                    : "stories"}
                </Text>
              </View>
            )}
            {property.propertyFacts?.buildingSize && (
              <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                <Image
                  source={icons.size}
                  resizeMode="contain"
                  className="w-4 h-4"
                />
                <Text className="text-md">
                  {property.propertyFacts?.buildingSize} sq ft
                </Text>
              </View>
            )}
            {property.portfolioSummary?.totalBuildingSize && (
              <View className="flex flex-row border border-neutral-400 rounded-md justify-center items-center p-1 gap-2">
                <Image
                  source={icons.size}
                  resizeMode="contain"
                  className="w-4 h-4"
                />
                <Text className="text-md">
                  {property.propertyFacts?.buildingSize} sq ft
                </Text>
              </View>
            )}
          </View>

          <Text className="text-md mb-4 text-gray-700 mt-3">
            {property.summary}
          </Text>

          <Text className="font-MontserratBold text-lg mb-1">Broker Info:</Text>
          <Text className="font-MontserratSemiBold">
            Name: {property.broker?.name}
          </Text>
          <Text className="font-MontserratSemiBold ">
            Phone: {property.broker?.phone}
          </Text>
          <Text className="font-MontserratSemiBold ">
            Email: {property.broker?.company}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingDetails;

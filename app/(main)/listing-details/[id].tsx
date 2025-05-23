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

  const property = properties.find((p) => p.listingId === id);

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
          <Text className="font-MontserratBold text-xl">
            {property.address.country}
          </Text>
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
            source={{ uri: property.images[0] }}
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
            ${property.price}
          </Text>

          <Text className="text-xl font-MontserratBold text-black-800 mt-2">
            {property.title}
          </Text>

          <Text className="text-xl font-MontserratSemiBold text-black-800 mb-3">
            {property.address.street}, {property.address.city},{" "}
            {property.address.state}
          </Text>

          <View className="flex flex-row gap-1.5">
            <View className="flex-1 border border-neutral-400 rounded-lg bg-neutral-200 justify-center items-center p-2 gap-2">
              <Image
                source={icons.bed}
                resizeMode="contain"
                className="w-6 h-6"
              />
              <Text className="text-md">{property.bedrooms} beds</Text>
            </View>
            <View className="flex-1 border border-neutral-400 rounded-lg bg-neutral-200 justify-center items-center p-2 gap-2">
              <Image
                source={icons.bathtub}
                resizeMode="contain"
                className="w-6 h-6"
              />
              <Text className="text-md">{property.bathrooms} baths</Text>
            </View>
            <View className="flex-1 border border-neutral-400 rounded-lg bg-neutral-200 justify-center items-center p-2 gap-2">
              <Image
                source={icons.size}
                resizeMode="contain"
                className="w-6 h-6"
              />
              <Text className="text-md">{property.square_ft} sq ft</Text>
            </View>
          </View>

          <Text className="text-md mb-4 text-gray-700 mt-3">
            {property.description}
          </Text>

          <Text className="font-MontserratBold text-lg mb-1">Broker Info:</Text>
          <Text className="font-MontserratSemiBold">
            Name: {property.broker.name}
          </Text>
          <Text className="font-MontserratSemiBold ">
            Phone: {property.broker.phone}
          </Text>
          <Text className="font-MontserratSemiBold ">
            Email: {property.broker.email}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingDetails;

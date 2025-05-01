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
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={icons.leftArrow}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text>{property.address.country}</Text>
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
        <Image
          source={{ uri: property.images[0] }}
          className="w-full h-60 rounded-xl mb-4"
          resizeMode="cover"
        />

        <View className="flex-row justify-between">
          <Text className="text-xl font-MontserratSemiBold mb-2">
            {property.propertyType}
          </Text>

          <Text className="text-xl font-MontserratRegular text-slate-800 mb-1">
            Listed on Dec. 24, 2020
          </Text>
        </View>

        <Text className="text-2xl font-MontserratBold text-cyan-800">
          ${property.price}
        </Text>

        <View className="flex flex-row gap-1.5">
          <View className="flex border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
            <Image
              source={icons.bed}
              resizeMode="contain"
              className="w-6 h-6"
            />
            <Text className="text-md">{property.bedrooms} beds</Text>
          </View>
          <View className="flex border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
            <Image
              source={icons.bathtub}
              resizeMode="contain"
              className="w-6 h-6"
            />
            <Text className="text-md">{property.bathrooms} baths</Text>
          </View>
          <View className="flex border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
            <Image
              source={icons.home}
              resizeMode="contain"
              className="w-6 h-6"
            />
            <Text className="text-md">{property.square_ft} sq ft</Text>
          </View>
        </View>

        <Text className="text-md mb-4 text-gray-700">
          {property.description}
        </Text>

        <Text className="font-MontserratSemiBold mb-1">Broker Info:</Text>
        <Text>Name: {property.broker.name}</Text>
        <Text>Phone: {property.broker.phone}</Text>
        <Text>Email: {property.broker.email}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingDetails;

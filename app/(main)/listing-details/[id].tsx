import { icons } from "@/constants";
import { usePropertyStore } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
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
    <ScrollView>
      <View className="flex-row">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.leftArrow}
            className="w-5 h-5"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text>Property</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ListingDetails;

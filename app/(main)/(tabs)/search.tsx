import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import GoogleAutoCompleteInput from "@/components/GoogleAutoCompleteInput";
import { icons } from "@/constants";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { usePropertyStore } from "@/store";
import { LocationInfo, LoopNetProperty } from "@/types/type";

const Search = () => {
  const [searchResults, setSearchResults] = useState<LoopNetProperty[]>([]);
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation(currentLocation.coords);
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const handleLocationSelect = async ({
    lat,
    lng,
    city,
    state,
  }: LocationInfo) => {
    console.log("Location selected", city, state, lat, lng);
    setRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });

    const filtered = properties.filter(
      (property) => property.address.city.toLowerCase() === city.toLowerCase(),
    );

    setSearchResults(filtered);
  };

  const {
    properties,
    fetchMockProperties,
    likeProperty,
    unlikeProperty,
    likedProperties,
  } = usePropertyStore();

  useEffect(() => {
    fetchMockProperties();
  }, [fetchMockProperties]);

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="px-5 my-2">
            <Text className="font-MontserratBold text-2xl mb-3">Search</Text>
            <GoogleAutoCompleteInput
              icon={icons.search}
              iconStyles="bg-slate-600"
              onLocationSelect={handleLocationSelect}
            />
          </View>

          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            {region && (
              <MapView
                region={region}
                showsUserLocation
                showsMyLocationButton
                style={{
                  height: 450,
                  width: "100%",
                  padding: 15,
                }}
              >
                {searchResults.map((property) => (
                  <Marker
                    key={property.listingId}
                    coordinate={{
                      latitude: property.coordinates.lat,
                      longitude: property.coordinates.lng,
                    }}
                    title={property.address.street}
                    description={`$${property.price}`}
                  />
                ))}
              </MapView>
            )}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <BottomSheet
          snapPoints={["28%", "80%"]}
          index={1}
          ref={bottomSheetRef}
          enablePanDownToClose={false}
          containerStyle={{
            position: "absolute",
            bottom: 0,
          }}
          onClose={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
        >
          <BottomSheetScrollView
            className=""
            contentContainerStyle={{ alignItems: "center" }}
          >
            {searchResults.length === 0 ? (
              <Text className="text-center text-gray-500 mt-4">
                No results yet. Search a location!
              </Text>
            ) : (
              searchResults.map((item) => {
                const isLiked = likedProperties.some(
                  (p) => p.listingId === item.listingId,
                );

                return (
                  <View
                    key={item.listingId}
                    className="w-[95%] border my-2 border-[#a7a9aa] rounded-lg bg-white"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 5,
                    }}
                  >
                    <TouchableOpacity>
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

                          <TouchableOpacity
                            className="bg-transparent mr-1"
                            onPress={() => {
                              if (isLiked) {
                                unlikeProperty(item.listingId);
                              } else {
                                likeProperty(item);
                              }
                            }}
                          >
                            <Image
                              source={
                                isLiked
                                  ? icons.heartFilled
                                  : icons.heartUnfilled
                              }
                              className="w-8 h-8"
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Search;

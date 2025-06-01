import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { usePropertyStore } from "@/store";
import { LocationInfo, LoopNetProperty } from "@/types/type";

const Search = () => {
  const {
    properties,
    fetchPropertiesByCoordinates,
    likedProperties,
    likeProperty,
    unlikeProperty,
  } = usePropertyStore();
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

      await fetchPropertiesByCoordinates(latitude, longitude);
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

    // const filtered = properties.filter(
    //   (property) =>
    //     property.location.split(",")[0].trim().toLowerCase() ===
    //     city.toLowerCase(),
    // );

    // setSearchResults(filtered);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-5 pt-3 pb-2 bg-white z-50">
          <Text className="font-MontserratBold text-2xl">Search</Text>
        </View>

        <View className="flex-1">
          {region && (
            <MapView
              region={region}
              showsUserLocation
              showsMyLocationButton
              style={{
                zIndex: 0,
                height: "100%",
                width: "100%",
              }}
              onPress={Keyboard.dismiss}
            >
              {properties.map(
                (property) =>
                  property.coordinates && (
                    <Marker
                      key={property.listingId}
                      coordinate={{
                        latitude: property.coordinates.lat,
                        longitude: property.coordinates.lng,
                      }}
                      title={property.address}
                      description={property.propertyFacts?.price}
                    />
                  ),
              )}
            </MapView>
          )}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="absolute top-36 w-full px-5 z-50"
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View className="flex-row items-center">
              <GoogleAutoCompleteInput
                onLocationSelect={handleLocationSelect}
              />

              <TouchableOpacity>
                <View className="rounded-full p-3 bg-slate-400">
                  <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            </View>
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
            {properties.length === 0 ? (
              <Text className="text-center text-gray-500 mt-4">
                No results yet. Search a location!
              </Text>
            ) : (
              properties.map((item) => {
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
                              source={{ uri: item.carousel?.[0]?.url }}
                              resizeMode="contain"
                              className="w-20 h-20"
                            />
                          </View>

                          <View className="flex-1 justify-between">
                            <View className="flex flex-row gap-1.5">
                              {item.saleSummary?.numberOfStories && (
                                <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
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
                                <View className="flex flex-row border border-neutral-400 rounded-lg justify-center items-center p-2 gap-2">
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

                            <Text className="text-2xl font-MontserratRegular text-cyan-800">
                              {item.propertyFacts?.price ?? "N/A"}
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

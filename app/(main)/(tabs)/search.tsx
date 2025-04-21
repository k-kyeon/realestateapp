import {
  View,
  Text,
  SafeAreaView,
  Button,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
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

const Search = () => {
  const [searchResults, setSearchResults] = useState("");
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

  const handleLocationSelect = ({
    lat,
    lng,
    city,
    state,
  }: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  }) => {
    console.log("Location selected", city, state, lat, lng);
  };

  const searchResultss = [{ title: "Hello", id: 2 }];

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View className="p-2">
              <Text className="font-MontserratBold text-2xl mb-3">Search</Text>
              <GoogleAutoCompleteInput
                icon={icons.search}
                iconStyles="bg-slate-600"
                onLocationSelect={({ lat, lng, city, state }) => {
                  console.log("Location selected:", city, state, lat, lng);
                }}
              />
            </View>
          </TouchableWithoutFeedback>

          {region && (
            <MapView
              region={region}
              showsUserLocation
              showsMyLocationButton
              style={{
                height: 450,
                width: "100%",
                padding: 10,
              }}
            >
              <Marker coordinate={region} />
            </MapView>
          )}
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
          <BottomSheetScrollView className="">
            {searchResults.length === 0 ? (
              <Text className="text-center text-gray-500 mt-4">
                No results yet. Search a location!
              </Text>
            ) : (
              <FlatList
                data={searchResultss}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="py-4 border-b border-gray-200">
                    <Text className="text-base text-gray-700">
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Search;

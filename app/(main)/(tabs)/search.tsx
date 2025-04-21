import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useEffect, useState } from "react";
import GoogleAutoCompleteInput from "@/components/GoogleAutoCompleteInput";
import { icons } from "@/constants";
import * as Location from "expo-location";
import MapView, { Marker, Region } from "react-native-maps";

const Search = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

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

  return (
    <SafeAreaView>
      <View className="p-10">
        <Text className="font-MontserratBold text-2xl my-4">Search</Text>
        <GoogleAutoCompleteInput
          icon={icons.search}
          iconStyles="bg-slate-600"
          onLocationSelect={({ lat, lng, city, state }) => {
            console.log("Location selected:", city, state, lat, lng);
          }}
        />
      </View>
      {region && (
        <MapView
          region={region}
          showsUserLocation
          showsMyLocationButton
          style={{ height: 400, width: "100%" }}
        >
          <Marker coordinate={region} />
        </MapView>
      )}
      <View>
        <Text>BOTTOM TAB DISPLAY</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

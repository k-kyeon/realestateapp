import { View } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleAutoCompleteInput = ({
  icon,
  onLocationSelect,
}: GoogleInputProps) => {
  return (
    <View className="flex flex-row justify-center items-center">
      {icon && <View className="">{icon}</View>}
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder="Search city (e.g. Miami)"
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        debounce={200}
        styles={{
          textInput: {
            backgroundColor: "white",
            fontSize: 15,
            fontWeight: "400",
            width: "100%",
            borderRadius: 20,
          },
          textInputContainer: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#dbdbdb",
          },
          listView: {
            backgroundColor: "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 12,
            shadowColor: "#dbdbdb",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          const lat = details?.geometry.location.lat!;
          const lng = details?.geometry.location.lng!;

          const cityComponent = details?.address_components.find((component) =>
            component.types.includes("locality"),
          );
          const city =
            cityComponent?.long_name || data.structured_formatting.main_text;

          const stateComponent = details?.address_components.find((component) =>
            component.types.includes("administrative_area_level_1"),
          );
          const state = stateComponent?.short_name;

          onLocationSelect({ lat, lng, city, state });
        }}
      />
    </View>
  );
};

export default GoogleAutoCompleteInput;

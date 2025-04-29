import React from "react";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleAutoCompleteInput = ({ onLocationSelect }: GoogleInputProps) => {
  return (
    <GooglePlacesAutocomplete
      fetchDetails
      placeholder="Search city (e.g. Miami)"
      query={{
        key: googlePlacesApiKey,
        language: "en",
      }}
      debounce={200}
      textInputProps={{
        placeholderTextColor: "#999999",
        style: {
          backgroundColor: "white",
          fontSize: 15,
          fontWeight: "400",
          width: "100%",
          borderRadius: 15,
          height: 45,
          paddingVertical: 10,
          paddingHorizontal: 10,
        },
      }}
      styles={{
        textInputContainer: {
          borderRadius: 20,
          backgroundColor: "white",
          marginRight: 10,
          position: "relative",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          paddingHorizontal: 10,
        },
        listView: {
          backgroundColor: "white",
          width: "100%",
          borderRadius: 12,
          zIndex: 99,
          elevation: 2,
          position: "absolute",
          top: 50,
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
  );
};

export default GoogleAutoCompleteInput;

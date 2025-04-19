import { View, Text, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";
import GoogleAutoCompleteInput from "@/components/GoogleAutoCompleteInput";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <View className="p-10">
        <Text>Search</Text>
        <GoogleAutoCompleteInput
          onLocationSelect={({ lat, lng, city, state }) => {
            console.log("Location selected:", city, state, lat, lng);
          }}
        />
        <Button title="Search" />
      </View>
      <View className="p-10">
        <Text>
          MAP DISPLAY MAP DISPLAY MAP DISPLAY MAP DISPLAY MAP DISPLAY MAP
          DISPLAY
        </Text>
      </View>
      <View>
        <Text>BOTTOM TAB DISPLAY</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;

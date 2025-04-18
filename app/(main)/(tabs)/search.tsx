import { View, Text, SafeAreaView, TextInput, Button } from "react-native";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView>
      <View className="p-10">
        <Text>Search</Text>
        <TextInput
          placeholder="e.g. Homes in Miami under 800k"
          value={search}
          onChangeText={setSearch}
          className="border p-3 mb-2 rounded-lg"
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

import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "@/constants";

const Chat = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5">
        <Text className="text-2xl font-MontserratBold my-3">Chat</Text>
        <View className="flex justify-center items-center mt-20">
          <Image
            source={images.chatImage}
            className="w-[300px] h-[300px]"
            resizeMode="contain"
          />
          <Text className="text-2xl font-MontserratSemiBold mt-2">
            No Messages Yet
          </Text>
          <Text className="text-xl font-MontserratMedium text-center mt-2">
            Start a conversation with your agent today
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

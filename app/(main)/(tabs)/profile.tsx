import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const Profile = () => {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <ScrollView className="px-5">
        <Text className="text-2xl font-MontserratBold my-3">My Profile</Text>

        <View className="flex items-center justify-center my-5 shadow-md shadow-slate-600">
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            className="rounded-full h-[120px] w-[120px]"
          />
        </View>

        <View className="px-2">
          <InputField
            label="First name"
            placeholder={user?.firstName || "Not Found"}
            editable={false}
            icon={icons.revise}
            iconRight={true}
          />

          <InputField
            label="Last name"
            placeholder={user?.lastName || "Not Found"}
            editable={false}
            icon={icons.revise}
            iconRight={true}
          />

          <InputField
            label="Email"
            placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
            editable={false}
            icon={icons.revise}
            iconRight={true}
          />

          <InputField
            label="Phone"
            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            editable={false}
            icon={icons.revise}
            iconRight={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

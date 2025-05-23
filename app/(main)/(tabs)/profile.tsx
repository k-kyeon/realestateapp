import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { router } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const [editField, setEditField] = useState<null | "firstName" | "lastName">(
    null,
  );

  const getIcon = (field: typeof editField) => {
    const current = field === "firstName" ? firstName.trim() : lastName.trim();
    const original =
      field === "firstName" ? user?.firstName?.trim() : user?.lastName?.trim();

    if (editField !== field) return icons.revise;

    // In edit mode
    if (!current || current === original) return icons.close;

    return icons.check;
  };

  const handleSave = async () => {
    try {
      if (!user) return;

      const updates: { firstName?: string; lastName?: string } = {};

      if (editField === "firstName" && firstName !== user.firstName) {
        updates.firstName = firstName;
      }
      if (editField === "lastName" && lastName !== user.lastName) {
        updates.lastName = lastName;
      }

      if (Object.keys(updates).length > 0) {
        await user.update(updates);
      }

      Alert.alert("Success", "Profile updated.");
      setEditField(null);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
      console.error(error);
    }
  };

  const toggleEdit = (field: typeof editField) => {
    const current = field === "firstName" ? firstName.trim() : lastName.trim();
    const original =
      field === "firstName" ? user?.firstName?.trim() : user?.lastName?.trim();

    if (editField === field) {
      if (!current || current === original) {
        // Cancel edit
        if (field === "firstName") setFirstName(original || "");
        if (field === "lastName") setLastName(original || "");
        setEditField(null);
      } else {
        // Save
        handleSave();
      }
    } else {
      setEditField(field);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            signOut();
            router.replace("/(auth)/sign-in");
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="px-5">
        <View className="flex flex-row justify-between my-3">
          <Text className="text-2xl font-MontserratBold">My Profile</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Image
              source={icons.logout}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
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
            editable={editField === "firstName"}
            icon={getIcon("firstName")}
            iconRight={true}
            iconStyle="mr-0.5"
            value={firstName}
            onChangeText={setFirstName}
            onIconPress={() => toggleEdit("firstName")}
          />

          <InputField
            label="Last name"
            placeholder={user?.lastName || "Not Found"}
            editable={editField === "lastName"}
            icon={getIcon("lastName")}
            iconRight={true}
            iconStyle="mr-0.5"
            value={lastName}
            onChangeText={setLastName}
            onIconPress={() => toggleEdit("lastName")}
          />

          <InputField
            label="Email"
            placeholder={user?.primaryEmailAddress?.emailAddress || "Not Found"}
            editable={false}
          />

          <InputField
            label="Phone"
            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="p-3">
          <View>
            <View className="w-full h-[300px] mb-16">
              <Image source={images.signup} className="w-full h-[300px]" />
              <Text className="text-5xl font-MontserratRegular ml-1 mb-2 text-slate-500">
                Welcome!
              </Text>
              <Text className="text-xl font-MontserratBold ml-2">
                Create Your Account
              </Text>
            </View>
          </View>

          <View className="p-10">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={form.name}
              icon={icons.nameicon}
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              icon={icons.mailicon}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={form.email}
              icon={icons.passwordicon}
            />
            <CustomButton title="Sign Up" className="mt-10 bg-sky-100" />
            <Link
              href="/sign-in"
              className="text-lg text-center font-MontserratLight mt-10"
            >
              <Text>Already have an account?</Text>
              <Text
                className="text-lg font-MontserratMedium text-sky-600
              "
              >
                {" "}
                Log In
              </Text>
            </Link>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

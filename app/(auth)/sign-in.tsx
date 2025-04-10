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
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn, setActive, isLoaded } = useSignIn();

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
                Welcome back!
              </Text>
              <Text className="text-xl font-MontserratBold ml-2 mb-2">
                Sign In
              </Text>
            </View>
          </View>

          <View className="p-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              icon={icons.mail}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              icon={icons.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry={true}
            />

            <CustomButton
              title="Sign In"
              titleStyles="text-[#1e7f7c]"
              className="mt-10 border-sky-500 bg-sky-200/90 shadow-cyan-200"
              onPress={onSignInPress}
            />

            <OAuth />

            <View className="flex flex-row justify-center">
              <Text className="text-lg text-center font-MontserratLight mt-10">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-center font-MontserratLight mt-10"
              >
                <Text
                  className="text-lg font-MontserratMedium text-sky-600
              "
                >
                  {" "}
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

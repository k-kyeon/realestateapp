import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { fetchAPI } from "@/misc/fetch";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  const [pendingVerification, setPendingVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification({ ...pendingVerification, state: "pending" });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: pendingVerification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setPendingVerification({ ...pendingVerification, state: "success" });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setPendingVerification({
          ...pendingVerification,
          error: "Verification failed.",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setPendingVerification({
        ...pendingVerification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
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
                Welcome!
              </Text>
              <Text className="text-xl font-MontserratBold ml-2">
                Create Your Account
              </Text>
            </View>
          </View>

          <View className="p-5">
            <InputField
              label="Name"
              placeholder="Enter your name"
              value={form.name}
              icon={icons.name}
              iconLeft={true}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={form.email}
              icon={icons.mail}
              iconLeft={true}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              icon={icons.password}
              iconLeft={true}
              onChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry={true}
            />

            <CustomButton
              title="Sign Up"
              titleStyles="text-[#0c5555]"
              className="mt-10 border-sky-500 bg-sky-200/90 shadow-cyan-200"
              onPress={onSignUpPress}
            />

            <OAuth />

            <View className="flex flex-row justify-center">
              <Text className="text-lg text-center font-MontserratLight mt-10">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg text-center font-MontserratLight mt-10"
              >
                <Text
                  className="text-lg font-MontserratMedium text-sky-600
              "
                >
                  {" "}
                  Log In
                </Text>
              </Link>
            </View>
          </View>

          <Modal
            visible={pendingVerification.state === "pending"}
            animationType="slide"
            transparent={true}
            onDismiss={() => {
              if (pendingVerification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="flex-1 justify-center items-center bg-slate-400/50">
              <View className="bg-white rounded-2xl border-2 px-5 py-8 min-h-[250px] max-w-md">
                <Text className="text-2xl font-MontserratBold mb-2.5">
                  Email Verification
                </Text>
                <Text className="font-MontserratMedium">
                  We've sent a verification code to {form.email}
                </Text>

                <InputField
                  label="Code"
                  icon={icons.password}
                  iconLeft={true}
                  placeholder="123456"
                  value={pendingVerification.code}
                  keyboardType="numeric"
                  onChangeText={(code) => {
                    setPendingVerification({
                      ...pendingVerification,
                      code: code,
                    });
                  }}
                />

                {pendingVerification.error && (
                  <Text className="text-red-600 text-sm">
                    {pendingVerification.error}
                  </Text>
                )}

                <CustomButton
                  title="Verify Email"
                  onPress={onVerifyPress}
                  className="bg-sky-200 mt-6"
                />
              </View>
            </View>
          </Modal>

          <Modal
            visible={showSuccessModal}
            animationType="slide"
            transparent={true}
          >
            <View className="flex-1 justify-center items-center bg-slate-400/50">
              <View className="bg-white rounded-2xl border-2 px-5 py-8 min-h-[250px] max-w-md">
                <Image
                  source={images.verified}
                  className="w-[300px] h-[300px]"
                />

                <Text className="font-MontserratSemiBold text-3xl text-center text-black">
                  Verified
                </Text>

                <Text className="text-base text-gray-600 font-MontserratMedium text-center mt-2">
                  You have successfully verified your account.
                </Text>

                <CustomButton
                  title="Go Explore"
                  onPress={() => {
                    setShowSuccessModal(false);
                    router.push("/(main)/(tabs)/home");
                  }}
                  className="mt-4"
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

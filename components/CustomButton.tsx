import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const CustomButton = ({
  title,
  LeftIcon,
  RightIcon,
  onPress,
  titleStyles,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row rounded-full shadow-md border p-2 justify-center items-center ${className}`}
    >
      {LeftIcon && <LeftIcon />}
      <Text className={`text-lg font-MontserratBold ${titleStyles}`}>
        {title}
      </Text>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};

export default CustomButton;

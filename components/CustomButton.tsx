import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const CustomButton = ({
  title,
  LeftIcon,
  RightIcon,
  onPress,
  className,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row border-2 rounded-full p-2 justify-center items-center ${className}`}
    >
      {LeftIcon && <LeftIcon />}
      <Text className="text-lg font-MontserratBold">{title}</Text>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  );
};

export default CustomButton;

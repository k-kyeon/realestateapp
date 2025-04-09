import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  TextInput,
} from "react-native";
import React from "react";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry,
  containerStyle,
  iconStyle,
  inputStyle,
  labelStyle,
  ...props
}: InputFieldProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-3">
        <View className="w-full mb-1">
          <Text className={`text-lg font-MontserratSemiBold ${labelStyle}`}>
            {label}
          </Text>
        </View>
        <View
          className={`flex flex-row justify-start items-center rounded-full border border-sky-950 bg-neutral-100 p-4 focus:border-cyan-400 ${containerStyle}`}
        >
          {icon && (
            <Image source={icon} className={`w-6 h-6 mx-2.5 ${iconStyle}`} />
          )}

          <TextInput
            className={`flex-1 font-MontserratMedium text-[14px] border-x-slate-600 ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={"#939d9d"}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;

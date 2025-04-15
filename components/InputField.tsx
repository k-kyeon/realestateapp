import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
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
  iconLeft,
  iconRight,
  onIconPress,
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

        {iconLeft && (
          <View
            className={`flex flex-row justify-start items-center rounded-2xl border border-sky-950 bg-[#f7f9f8] p-4 focus:border-cyan-400 ${containerStyle}`}
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
        )}

        {iconRight && (
          <View
            className={`flex flex-row justify-start items-center rounded-2xl border border-sky-950 bg-[#f7f9f8] p-4 focus:border-cyan-400 ${containerStyle}`}
          >
            <TextInput
              className={`flex-1 font-MontserratMedium text-[14px] border-x-slate-600 ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={"#939d9d"}
              {...props}
            />

            {icon && (
              <TouchableOpacity onPress={onIconPress}>
                <Image
                  source={icon}
                  className={`w-6 h-6 mx-2.5 ${iconStyle}`}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {!iconLeft && !iconRight && (
          <View
            className={`flex flex-row justify-start items-center rounded-2xl border border-sky-950 bg-[#f7f9f8] p-4 focus:border-cyan-400 ${containerStyle}`}
          >
            <TextInput
              className={`flex-1 font-MontserratMedium text-[14px] border-x-slate-600 ${inputStyle}`}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={"#939d9d"}
              {...props}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;

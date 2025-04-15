import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  titleStyles?: string;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  containerStyle?: string;
  iconStyle?: string;
  inputStyle?: string;
  labelStyle?: string;
  className?: string;
  iconLeft?: boolean;
  iconRight?: boolean;
  onIconPress?: () => void;
}

import { TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  className?: string;
}

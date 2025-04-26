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

declare interface GoogleInputProps {
  icon?: any;
  iconStyles?: string;
  onLocationSelect: (info: {
    lat: number;
    lng: number;
    city?: string;
    state?: string;
  }) => void;
}

export interface LoopNetProperty {
  listingId: string;
  title: string;
  description: string;
  price: number;
  propertyType: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  broker: {
    name: string;
    phone: string;
    email: string;
  };
  bedrooms: number;
  bathrooms: number;
  square_ft: number;
}

declare interface PropertyStore {
  properties: LoopNetProperty[];
  fetchMockProperties: () => void;
  likedProperties: LoopNetProperty[];
  likeProperty: (property: LoopNetProperty) => Promise<void>;
  unlikeProperty: (listingId: string) => Promise<void>;
  fetchLikedProperties: (userId: string) => Promise<void>;
}

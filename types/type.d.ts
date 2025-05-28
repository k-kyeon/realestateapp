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

declare interface LocationInfo {
  lat: number;
  lng: number;
  city: string;
  state?: string;
}

declare interface GoogleInputProps {
  icon?: any;
  iconStyles?: string;
  onLocationSelect: (info: LocationInfo) => void;
}

declare interface LoopNetProperty {
  listingId: number;
  title: string;
  propertyType?: string;
  address: string;
  location: string;
  countryCode: string;
  listingType?: string | null;
  carousel?: {
    type: string;
    url: string;
    thumbnail?: string | null;
  }[];
  highlights?: string[];
  saleSummary?: {
    auction?: {
      startBid: string;
    };
    numberOfBeds?: string;
    numberOfStories?: string;
  };
  broker?: {
    contactId?: number;
    name?: string;
    company?: string;
    location?: string;
    phone?: string;
    companyLogo: string;
  };
  propertyFacts?: {
    noUnits?: string;
    saleType?: string;
    saleConditions?: string;
    propertyType?: string;
    propertySubtype?: string;
    apartmentStyle?: string;
    noStories?: string;
    buildingSize?: string;
    buildingClass?: string;
    landAcres?: string;
    yearBuilt?: string;
    parkingRatio?: string;
    price?: string;
  };
  portfolioSummary?: {
    totalBuildingSize?: string;
  };
  amenities?: {
    label: string;
    amenitiesList: string[];
  }[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

declare interface PropertyStore {
  properties: LoopNetProperty[];
  fetchMockProperties: () => void;
  fetchProperties: (locationId?: string) => Promise<void>;
  likedProperties: LoopNetProperty[];
  likeProperty: (property: LoopNetProperty) => Promise<void>;
  unlikeProperty: (listingId: number) => Promise<void>;
  fetchLikedProperties: (userId: string) => Promise<void>;
}

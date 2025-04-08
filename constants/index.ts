import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
};

export const onboarding = [
  {
    id: 1,
    title: "Simple",
    description: "Search for your perfect home effortlessly.",
    image: images.onboarding1,
    bgColor: "#fca5a5",
  },
  {
    id: 2,
    title: "Premium",
    description:
      "Our team of world class real estate agents are here to assist you.",
    image: images.onboarding2,
    bgColor: "#cbe2ff",
  },
  {
    id: 3,
    title: "Dreamy",
    description:
      "Discover the luxury residence that aligns with your ambitions.",
    image: images.onboarding3,
    bgColor: "#cbffdf",
  },
];

export const data = {
  onboarding,
};

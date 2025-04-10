import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signup from "@/assets/images/signup.png";
import mail from "@/assets/icons/mail.png";
import password from "@/assets/icons/password.png";
import name from "@/assets/icons/name.png";
import google from "@/assets/icons/google.png";
import verified from "@/assets/images/verified.png";
import bookmark from "@/assets/icons/bookmark.png";
import home from "@/assets/icons/home.png";
import leftArrow from "@/assets/icons/left-arrow.png";
import profile from "@/assets/icons/profile.png";
import logout from "@/assets/icons/logout.png";
import chat from "@/assets/icons/chat.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  signup,
  verified,
};

export const icons = {
  mail,
  password,
  name,
  google,
  bookmark,
  home,
  leftArrow,
  profile,
  logout,
  chat,
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
    description: "Discover the luxury residence that you always dreamed of.",
    image: images.onboarding3,
    bgColor: "#cbffdf",
  },
];

export const data = {
  onboarding,
};

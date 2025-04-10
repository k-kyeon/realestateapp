import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View className={`flex justify-center items-center rounded-full ${focused}`}>
    <View>
      <Image
        source={source}
        resizeMode="contain"
        className="w-7 h-7"
        tintColor="white"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs>
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="saved"
      options={{
        title: "Saved",
        headerShown: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabIcon focused={focused} source={icons.bookmark} />
        ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;

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
  <View
    className={`flex justify-center items-center rounded-full ${
      focused ? "bg-slate-200" : ""
    }`}
  >
    <View
      className={`rounded-full w-12 h-12 justify-center items-center ${
        focused ? "bg-[#585f61]" : ""
      }`}
    >
      <Image
        source={source}
        resizeMode="contain"
        className="w-7 h-7 p-0.5"
        tintColor="white"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#212c30",
        borderRadius: 45,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 35,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        height: 65,
      },
    }}
  >
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

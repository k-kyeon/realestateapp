import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View className={`flex justify-center items-center rounded-full`}>
    <View>
      <Image source={source} />
    </View>
  </View>
);

const Layout = () => (
  <Tabs>
    <Tabs.Screen name="home" />
    <Tabs.Screen name="saved" />
    <Tabs.Screen name="chat" />
    <Tabs.Screen name="profile" />
  </Tabs>
);

export default Layout;

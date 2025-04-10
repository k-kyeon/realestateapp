import { Tabs } from "expo-router";

const Layout = () => (
  <Tabs>
    <Tabs.Screen name="home" />
    <Tabs.Screen name="saved" />
    <Tabs.Screen name="chat" />
    <Tabs.Screen name="profile" />
  </Tabs>
);

export default Layout;

import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { cores } from "../../constants/cores";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: cores.fundo,
        },
        headerShadowVisible: false,
        headerTintColor: cores.texto,
        headerTitleStyle: {
          fontWeight: "700",
        },
        tabBarStyle: {
          display: "none",
        },
        headerTitle: "Mochila Segura",
      }}
    >
      <Tabs.Screen name="index" />
    </Tabs>
  );
}

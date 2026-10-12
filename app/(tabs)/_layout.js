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
          backgroundColor: cores.card,
          borderTopColor: cores.cardClaro,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: cores.roxo,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerTitle: "Mochila Segura",
      }}
    >
    </Tabs>
  );
}

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#0c1a3a" />
      <Stack screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Exemplo de modal",
          }}
        />
      </Stack>
    </>
  );
}

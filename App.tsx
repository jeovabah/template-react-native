import * as React from "react";
import "./global.css"
import { NavigationContainer } from "@react-navigation/native";
import { Providers } from "@/providers";
import Toast from "@/components/Toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { Routes } from "@/routes/routes";
import { theme } from "@/theme";
import { navigationRef } from "@/routes/navigationRef";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Toast />
        <Providers>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </Providers>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

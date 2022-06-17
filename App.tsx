import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import 'react-native-gesture-handler'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ActivityIndicator, StatusBar } from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';

import { AuthProvider } from './src/hooks/auth';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        
          <StatusBar barStyle="light-content" />
          <AuthProvider>
          <Routes/>
          </AuthProvider>
       

      </ThemeProvider>
    </GestureHandlerRootView>
  );
}


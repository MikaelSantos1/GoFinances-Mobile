
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from "@react-navigation/native"
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins'

import theme from './src/global/styles/theme';
import { AppRoutes } from './src/routes/app.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  
  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
      <AppRoutes/>
      </NavigationContainer>
       
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}


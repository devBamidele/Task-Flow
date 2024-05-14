import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import BaseStack from './app/navigation/BaseStack';
import React from 'react';
import { fontConfig } from './app/utils/index';
import { Provider } from 'react-redux';
import appStore from './app/redux/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './app/common/Toast/toastConfig';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts(fontConfig);
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={appStore}>
      <BaseStack />
      <Toast config={toastConfig}/>
    </Provider>
    
  );
}

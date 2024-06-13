import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../hooks';
import { isLoggedIn } from '../redux/auth/slice';
import Colors from '@/app/utils/colors';
import HomeDrawer from './DrawerNavigation';
import LoginScreen from '../feature/auth/Login/LoginScreen';
import SignUpScreen from '../feature/auth/SignUp/SignUpScreen';
import WelcomeScreen from '../feature/welcome/WelcomeScreen';
import { BaseStackParamList } from '../utils';

const Stack = createNativeStackNavigator<BaseStackParamList>();

export default function BaseStack() {
  const loggedIn = useAppSelector(isLoggedIn);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.white },
          }}
        >
          {loggedIn ? (
            <Stack.Group>
              <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
            </Stack.Group>
          ) : (
            
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

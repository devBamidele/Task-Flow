import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BaseStackParamList } from '@/app/utils/types';
import Colors from '@/app/utils/colors';
import HomeDrawer from './DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../feature/auth/Login/LoginScreen';
import SignUpScreen from '../feature/auth/SignUp/SignUpScreen';
import WelcomeScreen from '../feature/welcome/WelcomeScreen';

const Stack = createNativeStackNavigator<BaseStackParamList>();

export default function BaseStack() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          
          screenOptions={{
            headerShown: false,
            contentStyle:{
              backgroundColor: Colors.white,   
            }
          }}
        >
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeDrawer" component={HomeDrawer} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}
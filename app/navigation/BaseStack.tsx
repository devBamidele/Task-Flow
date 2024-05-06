import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BaseStackParamList } from '@/app/utils/types';
import WelcomeScreen from '@/app/screens/WelcomeScreen';
import Colors from '@/app/utils/colors';
import LoginScreen from '@/app/screens/auth/LoginScreen';
import SignUpScreen from '@/app/screens/auth/SignUpScreen';
import HomeDrawer from './DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';

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
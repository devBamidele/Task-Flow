import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CurrentStackParamList } from '../utils/types';
import TodayScreen from '../screens/home/TodayScreen';
import Colors from '../utils/colors';
import TaskScreen from '../screens/home/TaskScreen';

const Stack = createNativeStackNavigator<CurrentStackParamList>();

export default function CurrentStack() {
    return (
        <Stack.Navigator
            initialRouteName='Task'
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: Colors.white,
                }
            }}
        >
            <Stack.Screen name='Today' component={TodayScreen} />
            <Stack.Screen name='Task' component={TaskScreen} />
        </Stack.Navigator>
    )
}
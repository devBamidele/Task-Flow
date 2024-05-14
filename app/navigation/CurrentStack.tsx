import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CurrentStackParamList } from '../utils/types';
import { Colors } from '../utils';
import TaskScreen from '../feature/home/TaskScreen';
import TodayScreen from '../feature/home/TodayScreen';


const Stack = createNativeStackNavigator<CurrentStackParamList>();

export default function CurrentStack() {
    return (
        <Stack.Navigator
            initialRouteName='Today'
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
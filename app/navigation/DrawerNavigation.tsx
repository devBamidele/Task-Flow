import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodayScreen from '../screens/home/TodayScreen';
import { HomeDrawerParamList } from '../utils/types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Today"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Today" component={TodayScreen} />
    </Drawer.Navigator>
  );
}
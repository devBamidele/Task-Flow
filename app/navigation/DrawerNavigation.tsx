import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../utils/types';
import CurrentStack from './CurrentStack';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="CurrentStack"
      screenOptions={{
        headerShown: false,        
      }}
    >
      <Drawer.Screen name="CurrentStack" component={CurrentStack} />
    </Drawer.Navigator>
  );
}
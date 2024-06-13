import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamList } from '../utils/types';
import CurrentStack from './CurrentStack';
import { AppDrawer } from '../common';
import { ms } from 'react-native-size-matters';
import { Colors } from '../utils';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();

export default function HomeDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawer {...props} />}
      initialRouteName="CurrentStack"
      screenOptions={{
        headerShown: false,
        drawerStyle: { },
      }}
    >
      <Drawer.Screen name="CurrentStack" component={CurrentStack} />
    </Drawer.Navigator>
  );
}
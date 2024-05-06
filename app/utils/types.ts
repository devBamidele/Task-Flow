import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Base Stack
type BaseStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  HomeDrawer: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<BaseStackParamList, "Welcome">;
type LoginScreenProps = NativeStackScreenProps<BaseStackParamList, "Login">;
type SignUpScreenProps = NativeStackScreenProps<BaseStackParamList, "SignUp">;

// Exports for the BaseStack
export {
  BaseStackParamList,
  WelcomeScreenProps,
  LoginScreenProps,
  SignUpScreenProps,
};

// Current Stack
type CurrentStackParamList = {
  Today: undefined;
  Task: object | undefined;
};

type TodayScreenProps = DrawerScreenProps<CurrentStackParamList, "Today">;
type TaskScreenProps = DrawerScreenProps<CurrentStackParamList, "Task">;

// Exports for the Current Stack
export {
  TodayScreenProps,
  TaskScreenProps,
  CurrentStackParamList,
};

// Home Drawer
type HomeDrawerParamList = {
  CurrentStack: undefined;
};

// Exports for the Home Drawer
export {
  HomeDrawerParamList,
};

// Other exports 
type CustomIconNames = "mail-outline" | "lock-closed-outline" | "person-outline" | "add-outline";
export type { CustomIconNames };


export enum weight {
  L = 'Light',
  B = 'Bold',
  M = 'Medium',
  R = 'Regular',
  T = 'Thin',
  Sb = 'SemiBold',
}
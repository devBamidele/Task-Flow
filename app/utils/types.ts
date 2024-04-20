import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type BaseStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  HomeDrawer: undefined;
};

type WelcomeScreenProps = NativeStackScreenProps<BaseStackParamList, "Welcome">;
type LoginScreenProps = NativeStackScreenProps<BaseStackParamList, "Login">;
type SignUpScreenProps = NativeStackScreenProps<BaseStackParamList, "SignUp">;
type HomeScreenProps = NativeStackScreenProps<BaseStackParamList, "HomeDrawer">;

// Exports for the BaseStack
export {
  BaseStackParamList,
  WelcomeScreenProps,
  LoginScreenProps,
  SignUpScreenProps,
  HomeScreenProps,
}


type HomeDrawerParamList = {
  Today: undefined;
}

type TodayScreenProps = DrawerScreenProps<HomeDrawerParamList, "Today">;

// Exports for the Home Drawer
export {
  HomeDrawerParamList,
  TodayScreenProps,
}

type customIconNames = "mail-outline" | "lock-closed-outline" | "person-outline" | "add-outline";

// Other exports 
export {
  customIconNames,
}

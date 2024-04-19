import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type BaseStackParamList = {
    Welcome: undefined;
    Login : undefined;
    SignUp : undefined;
    Home : undefined;

    // Other screens here
  };
  
export type WelcomeScreenProps = NativeStackScreenProps<BaseStackParamList, "Welcome">;
export type LoginScreenProps = NativeStackScreenProps<BaseStackParamList, "Login">;
export type SignUpScreenProps = NativeStackScreenProps<BaseStackParamList, "SignUp">;
export type HomeScreenProps = NativeStackScreenProps<BaseStackParamList, "Home">;


export type customIconNames = "mail-outline" | "lock-closed-outline" | "person-outline"; 

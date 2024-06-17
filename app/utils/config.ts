import { Platform } from "react-native";
import { weight } from "./types";

const dir = '@/assets/fonts/';

const fontConfig = {
  'Bold': require(`${dir}LexendDeca-Bold.ttf`),
  'Thin': require(`${dir}LexendDeca-Thin.ttf`),
  'Light': require(`${dir}LexendDeca-Light.ttf`),
  'Medium': require(`${dir}LexendDeca-Medium.ttf`),
  'Regular': require(`${dir}LexendDeca-Regular.ttf`),
  'SemiBold': require(`${dir}LexendDeca-SemiBold.ttf`),
  'iBold': require(`${dir}SF-Pro-Display-Bold.otf`),
  'iThin': require(`${dir}SF-Pro-Display-Thin.otf`),
  'iLight': require(`${dir}SF-Pro-Display-Light.otf`),
  'iMedium': require(`${dir}SF-Pro-Display-Medium.otf`),
  'iRegular': require(`${dir}SF-Pro-Display-Regular.otf`),
  'iSemiBold': require(`${dir}SF-Pro-Display-Semibold.otf`),
};

const isiOS = Platform.OS === 'ios';

const getFontFamily = (fontWeight: weight) => {

  const fontMapping = {
    [weight.B]: isiOS ? 'iBold' : 'Bold',
    [weight.T]: isiOS ? 'iThin' : 'Thin',
    [weight.L]: isiOS ? 'iLight' : 'Light',
    [weight.M]: isiOS ? 'iMedium' : 'Medium',
    [weight.R]: isiOS ? 'iRegular' : 'Regular',
    [weight.Sb]: isiOS ? 'iSemiBold' : 'SemiBold',
  };

  return fontMapping[fontWeight];
};

const EnvVars = {
  Google_ID : {
    web : process.env.GOOGLE_WEB_CLIENT_ID as string,
    android: process.env.GOOGLE_ANDROID_CLIENT_ID as string,
    iOS : process.env.GOOGLE_IOS_CLIENT_ID as string,
  }
}

export { fontConfig, getFontFamily, EnvVars };

import { getFontFamily } from '@/app/utils';
import { weight } from '@/app/utils/types';
import React from 'react';
import { Platform, Text, TextProps } from 'react-native';



interface AppTextProps extends TextProps {
  fontWeight?: weight;
}

const AppText: React.FC<AppTextProps> = (props) => {

  const { children, fontWeight = weight.R, style, ...rest } = props;

  const fontFamily = getFontFamily(fontWeight);

  const mergedStyle = [{ fontFamily }, style];

  return (<Text style={mergedStyle} {...rest}> {children} </Text>);
};

export default AppText;

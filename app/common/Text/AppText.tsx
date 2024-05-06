import { weight } from '@/app/utils/types';
import React from 'react';
import { Text, TextProps } from 'react-native';



interface AppTextProps extends TextProps {
  fontWeight?: weight; 
}

const AppText: React.FC<AppTextProps> = ({ children, fontWeight = weight.R, style, ...rest }) => {
  const fontFamily = `${fontWeight}`;

  const mergedStyle = [{ fontFamily }, style ];

  return ( <Text style={mergedStyle} {...rest}> {children} </Text> );
};

export default AppText;

import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface AppTextProps extends TextProps {
  fontWeight?: 'Light' | 'Bold' | 'Medium' | "Thin" | "SemiBold"; 
}

const AppText: React.FC<AppTextProps> = ({ children, fontWeight = 'Regular', style, ...rest }) => {
  const fontFamily = `${fontWeight}`;

  const mergedStyle = [{ fontFamily }, style ];

  return ( <Text style={mergedStyle} {...rest}> {children} </Text> );
};

export default AppText;
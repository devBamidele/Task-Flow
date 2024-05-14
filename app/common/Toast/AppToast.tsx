import { ColorValue, StyleSheet } from 'react-native'
import React from 'react'
import { BaseToast, BaseToastProps, ToastType } from 'react-native-toast-message'
import { weight } from '@/app/utils';

interface AppToastProps extends BaseToastProps {
    type: ToastType,
    props: BaseToastProps,
}

function selector(type: ToastType): ColorValue {
    const colors: { [key in ToastType]: ColorValue } = {
      success: 'green',
      error: 'red',
      info: 'yellow',
      default: 'gray',
    };
  
    return colors[type] || colors.default;
  }

const AppToast: React.FC<AppToastProps> = ({props, type}) => {
    return (
        <BaseToast
            {...props}
            style={{ borderLeftColor: selector(type), width: '80%' }}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    )
}

export default AppToast

const styles = StyleSheet.create({
    text1: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: weight.R    
    },

    text2: {
        fontSize: 14,
        fontFamily: weight.L
    }
})

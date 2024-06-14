import { ColorValue, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { BaseToast, BaseToastProps, ToastType } from 'react-native-toast-message'
import { Colors, getFontFamily, weight } from '@/app/utils';

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

const AppToast: React.FC<AppToastProps> = ({ props, type }) => {
    return (
        <BaseToast
            {...props}
            style={[styles.toastContainer, { borderLeftColor: selector(type) }]}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            text1Style={styles.text1}
            text2Style={styles.text2}
            text2NumberOfLines={2}
        />
    )
}

export default AppToast

const styles = StyleSheet.create({

    toastContainer: {
        width: '85%',
        height: 80,
    },

    text1: {
        fontSize: 15,
        fontWeight: '400',
        color: Colors.textColor1,
        fontFamily: getFontFamily(weight.R)
    },

    text2: {
        fontSize: 13,
        color: Colors.hintTextColor,
        fontFamily: getFontFamily(weight.L),

    }
})

import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { FC } from 'react'
import Colors from '../utils/colors'
import AppText from './AppText'

type onPress = () => void;

interface AppButtonProps {
    onPress?: onPress;
    buttonText: string;
    showNext?: boolean;
}

const AppButton: FC<AppButtonProps> = ({ onPress, buttonText, showNext = true }) => {
    return (
        <View style={styles.buttonView}>

            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.6}
                style={styles.button}>

                <View style={styles.shrinkBox} />

                <AppText
                    fontWeight='SemiBold'
                    style={styles.buttonText}>
                    {buttonText}
                </AppText>

                {showNext ? <Ionicons
                    size={26}
                    name={"arrow-forward-outline"}
                    color={Colors.white} /> : <View style={styles.shrinkBox} />}

            </TouchableOpacity>
        </View>
    )
}

export default AppButton

const styles = StyleSheet.create({
    buttonView: {
        paddingBottom: 24,
        paddingHorizontal: 20,
        width: "100%",
        marginTop: 50,
    },

    button: {
        flexDirection: 'row',
        justifyContent: "space-between",

        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: Colors.primary,
        borderRadius: 14,

        shadowColor: Colors.primary,
        elevation: 20,

        //iOS
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },

    shrinkBox: {
        width: 28,
        height: 28,
    },

    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontSize: 18,
    }
})
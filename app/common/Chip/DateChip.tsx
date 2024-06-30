import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppText from '../Text/AppText'
import { Colors, addOpacity, getDate } from '@/app/utils'
import { ms, s } from 'react-native-size-matters'
import Ionicons from '@expo/vector-icons/Ionicons';

interface ChipProps {
    date : string,
}

const DateChip : FC<ChipProps> = ({date}) => {
    return (
        <View style={styles.generic}>
            <Ionicons
                size={20}
                name={"calendar"}
                style={styles.icon}
            />
            <AppText style={styles.dateText}>
                {date}
            </AppText>
        </View>
    )
}

export default DateChip

const styles = StyleSheet.create({
    generic: {
        flexDirection: "row",
        alignItems: "center",
    },

    icon: {
        paddingLeft: s(3),
        paddingRight: ms(3),
        color: Colors.textColor3,
    },

    dateText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },
})
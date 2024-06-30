import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppText from '../Text/AppText'
import { ms } from 'react-native-size-matters'
import { Colors, addOpacity } from '@/app/utils'

interface ChipProps {

}

const ListChip : FC<ChipProps> = () => {
    return (
        <View style={styles.generic}>
            <View style={[styles.square, { backgroundColor: 'yellow' }]} />
            <AppText style={styles.dateText}>
                List 1
            </AppText>
        </View>
    )
}

export default ListChip

const styles = StyleSheet.create({
    generic: {
        flexDirection: "row",
        alignItems: "center",
    },

    square: {
        width: ms(13),
        height: ms(13),
        borderRadius: 4,
        marginTop: ms(2),
        marginRight: ms(4),
    },

    dateText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },
})
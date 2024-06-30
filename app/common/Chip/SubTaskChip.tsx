import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppText from '../Text/AppText'
import { Colors, addOpacity } from '@/app/utils'
import { ms } from 'react-native-size-matters'

interface ChipProps {
    length: number,
}

const SubTaskChip : FC<ChipProps> = ({length}) => {
    return (
        <View style={styles.generic}>
            <View style={styles.countContainer}>
                <AppText style={styles.countText}>
                    {length}
                </AppText>
            </View>
            <AppText style={styles.dateText}>
                Subtasks
            </AppText>
        </View>
    )
}

export default SubTaskChip

const styles = StyleSheet.create({
    generic: {
        flexDirection: "row",
        alignItems: "center",
    },
    countContainer: {
        backgroundColor: Colors.selectedTile,
        alignItems: 'center',
        borderRadius: 4,
        marginRight: ms(3),
        marginTop: ms(2),
        width: ms(24),
    },
    countText: {
        fontSize: ms(10),
    },
    dateText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },

})
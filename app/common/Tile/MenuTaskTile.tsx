import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, addOpacity } from '@/app/utils'
import Ionicons from '@expo/vector-icons/Ionicons';
import AppText from '../Text/AppText'
import { ScaledSheet, TextStyle, ms, mvs, s, vs } from 'react-native-size-matters';

type iconTypes = "add" |
    "list-outline" |
    "options-outline" |
    "calendar-outline" |
    "document-text-outline" |
    "checkmark-done-outline";

interface MenuTaskTileProps {
    title: string,
    icon: iconTypes,
}

const MenuTaskTile: FC<MenuTaskTileProps> = (props) => {

    const { title, icon } = props;

    return (
        <View style={styles.tile}>
            <Ionicons
                size={25}
                name={icon}
                style={styles.icon}
            />
            <AppText style={styles.tileText}>
                {title}
            </AppText>
        </View>
    )
}

export default MenuTaskTile

const styles = ScaledSheet.create({
    tile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        padding: s(5),
        color: Colors.textColor3,
    },

    tileText: {
        color: Colors.textColor4,
        paddingBottom: mvs(2),
        fontSize: ms(12),
    },
})
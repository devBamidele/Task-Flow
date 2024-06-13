import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, addOpacity, weight } from '@/app/utils';
import AppText from '../Text/AppText';
import { ScaledSheet, ms, s, vs } from 'react-native-size-matters';

interface MenuListTileProps {
    title: string;
    count: number | undefined;
    color: string;
    isSelected: boolean;
    onPress: (title: string) => void;
}

const MenuListTile: FC<MenuListTileProps> = (props) => {

    const { title, count, color, isSelected, onPress } = props;

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onPress(title)}
            style={[isSelected && styles.selectedTileColor]}
        >
            <View style={[styles.tile]}>
                <View style={styles.row}>
                    <View style={[styles.square, { backgroundColor: color }]} />
                    <AppText
                        fontWeight={isSelected ? weight.Sb : weight.R}
                        style={styles.tileText}>
                        {title}
                    </AppText>
                </View>
                <View style={[styles.countContainer, isSelected && styles.selectedTileCountContainer]}>
                    <AppText style={styles.countText}>
                        {count}
                    </AppText>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default MenuListTile;

const styles = ScaledSheet.create({

    tile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: ms(3),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedTileColor: {
        borderRadius: 6,
        backgroundColor: Colors.listTextBackground,
    },

    selectedTileCountContainer: {
        backgroundColor: Colors.white
    },

    square: {
        width: ms(13),
        height: ms(13),
        borderRadius: 4,
        margin: 8,
    },
    countContainer: {
        backgroundColor: Colors.numberContainer,
        alignItems: 'center',
        borderRadius: 4,
        margin: 8,
        width: ms(24),
    },
    tileText: {
        color: Colors.textColor4,
        paddingBottom: 3,
        fontSize: ms(12),
    },
    countText: {
        fontSize: ms(10),
    },
});

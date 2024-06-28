
import { Animated, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@/app/utils'
import { ms, mvs } from 'react-native-size-matters'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';

interface ActionProps {
    progressAnimatedValue: Animated.AnimatedInterpolation<number>;
    dragAnimatedValue: Animated.AnimatedInterpolation<number>;
    swipeable: Swipeable;
}

const LeftAction: FC<ActionProps> = ({ progressAnimatedValue, dragAnimatedValue, swipeable }) => {

    const scale = dragAnimatedValue.interpolate({
        inputRange: [0, 100], // 80
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });


    return (
        <View style={styles.deleteButton}>
            <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                    size={mvs(25)}
                    name={"trash-bin-outline"}
                    style={styles.icon}
                />
            </Animated.View>
        </View>
    )
}

export default LeftAction

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: Colors.error,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },

    deleteButtonText: {
        color: '#fff',
    },

    icon: {
        paddingHorizontal: ms(20),
        color: Colors.white,
    },
})
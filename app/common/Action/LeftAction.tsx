import { Animated, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '@/app/utils';
import { ms, mvs } from 'react-native-size-matters';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Swipeable } from 'react-native-gesture-handler';

interface ActionProps {
    progressAnimatedValue: Animated.AnimatedInterpolation<number>;
    dragAnimatedValue: Animated.AnimatedInterpolation<number>;
    swipeable: Swipeable;
    id: string;
}

const LeftAction: FC<ActionProps> = ({ progressAnimatedValue, dragAnimatedValue, swipeable, id }) => {
    const [tileHeight, setTileHeight] = useState(50); // Set a default height
    const heightAnim = useRef(new Animated.Value(50)).current;

    const scale = dragAnimatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const formattedProgress = progressAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const onLayout = (e: LayoutChangeEvent) => {
        const { height } = e.nativeEvent.layout;
        setTileHeight(height);
    };
   

    return (
        <Animated.View
            style={[styles.deleteButton, { height: heightAnim }]}
            onLayout={onLayout}
        >
            <Animated.View style={{ transform: [{ scale }] }}>
                <Ionicons
                    size={mvs(25)}
                    name={"trash-bin-outline"}
                    style={styles.icon}
                />
            </Animated.View>
        </Animated.View>
    );
}

export default LeftAction;

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: Colors.error,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row-reverse',
    },
    icon: {
        paddingHorizontal: ms(20),
        color: Colors.white,
    },
});

import { Pressable, StyleSheet, View, Vibration, LayoutChangeEvent } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AppText from '../Text/AppText';
import { Colors, TodayScreenProps, addOpacity, getDate, width } from '@/app/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getSelectedTiles, isSelecting, updateSelecting, Task } from '@/app/redux/tasks';
import { GestureDetector, Gesture, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { DateChip, SubTaskChip } from '../Chip';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';

interface TaskTileProps extends TodayScreenProps {
    item: Task;
    index: number;
    onDismiss?: (id: Task) => void;
}

const TaskTile: FC<TaskTileProps> = ({ item, navigation, onDismiss }) => {
    // Variable Declarations
    const dispatch = useAppDispatch();
    const hasDesc = item.description.trim() !== "";
    const select = useAppSelector(isSelecting);
    const selectedTiles = useAppSelector(getSelectedTiles);
    const initialLongPressed = selectedTiles.some(tileId => tileId === item._id);

    const [isChecked, setChecked] = useState(false);
    const [longPressed, setLongPressed] = useState(initialLongPressed);

    const TRANSLATE_X_THRESHOLD = width * 0.2;
    const itemHeight = useSharedValue<number | null>(null);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);


    useEffect(() => {
        if (!select) {
            setLongPressed(false);
        }
    }, [select]);

    // Handlers
    const onPress = useCallback(() => {
        if (select) {
            onLongPress(false);
            return;
        }
        navigation.navigate('Task', item);
    }, [select]);

    const onLongPress = useCallback((shouldVibrate: boolean) => {
        setLongPressed((prev) => !prev);
        dispatch(updateSelecting({ id: item._id, add: !longPressed }));
        if (shouldVibrate) {
            Vibration.vibrate(50);
        }
    }, [dispatch, item._id]);

    const onFinish = (finished?: boolean) => {
        'worklet';
        if (finished && onDismiss) {
            runOnJS(onDismiss)(item);
        }
    };

    const onLayout = ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => {
        itemHeight.value = height;
    };

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX * 0.7;
        })
        .onEnd(() => {
            const shouldBeDismissed = translateX.value > TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(width);
                itemHeight.value = withTiming(0);
                opacity.value = withTiming(0, undefined, onFinish);
            } else {
                translateX.value = withTiming(0);
            }
        }
    );

    // .simultaneousWithExternalGesture

    const rStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const rIconContainerStyle = useAnimatedStyle(() => {
        const scale = withTiming(
            interpolate(
                translateX.value,
                [width * 0.05, width * 0.15],
                [0.4, 0.9],
                "clamp"
            )
        );

        return {
            transform: [{ scale }],
        };
    });

    const rTaskContainerStyle = useAnimatedStyle(() => ({
        height: itemHeight.value,
        opacity: opacity.value,
    }));

    return (
        <Animated.View style={[rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <FontAwesome5 name={"trash-alt"} color={"red"} size={ms(21)} />
            </Animated.View>

            <GestureDetector gesture={panGesture}  >
                <Animated.View style={[rStyle]}>
                    <Pressable
                        style={[styles.container, longPressed && styles.selectedStyle]}
                        onPress={onPress}
                        delayLongPress={250}
                        onLongPress={() => onLongPress(true)}
                        onLayout={onLayout}
                    >
                        <Pressable style={styles.checkBoxPressable} onPress={() => setChecked(!isChecked)}>
                            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                        </Pressable>

                        <View style={styles.textContainer}>

                            <AppText numberOfLines={1} style={styles.title} key={item._id}>
                                {item.title}
                            </AppText>
                            {hasDesc && (
                                <AppText numberOfLines={1} style={styles.desc}>
                                    {item.description}
                                </AppText>
                            )}

                            <View style={styles.subContainer}>
                                {item.due_date && (
                                    <>
                                        <DateChip date={getDate(item.due_date)} />
                                        <View style={styles.divider} />
                                    </>
                                )}
                                {item.subtasks && item.subtasks.length > 0 && (
                                    <>
                                        <SubTaskChip length={item.subtasks.length} />
                                        <View style={styles.divider} />
                                    </>
                                )}
                                {/* <ListChip /> */}
                            </View>
                        </View>
                        <Ionicons size={22} style={styles.arrowIcon} name={"arrow-forward-outline"} />
                    </Pressable>
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};

export default TaskTile;

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        left: ms(25),
        bottom: '1%',
        top: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    onlyText: {
        // marginTop: 3,
    },

    selectedStyle: {
        backgroundColor: addOpacity(Colors.listTextBackground, 1),
    },
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginHorizontal: 4,
        paddingTop: 3, // Beware of this
        paddingBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: Colors.white,
    },


    checkBoxPressable: {
        paddingTop: 5,
        paddingLeft: 6,
        paddingRight: 12,
        paddingBottom: 10,
    },
    checkbox: {
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth * 1.5,
    },
    textContainer: {
        marginTop: 2,
        gap: 4,
        flex: 1,
        flexShrink: 1,
    },
    title: {
        fontSize: ms(12),
        color: Colors.textColor4,
    },
    desc: {
        color: addOpacity(Colors.black, 0.5),
        fontSize: ms(10),
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3,
    },
    arrowIcon: {
        marginRight: 6,
        marginTop: 6,
        marginLeft: 12,
        color: Colors.textColor4,
    },
    divider: {
        width: StyleSheet.hairlineWidth,
        height: '100%',
        backgroundColor: Colors.divider,
        marginRight: ms(10),
        marginLeft: ms(7),
        marginTop: ms(2),
    },
});

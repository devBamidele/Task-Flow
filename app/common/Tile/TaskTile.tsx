import { Pressable, StyleSheet, View, Vibration, Animated } from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AppText from '../Text/AppText';
import { Colors, TodayScreenProps, addOpacity, getDate, width } from '@/app/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getSelectedTiles, isSelecting, updateSelecting, Task } from '@/app/redux/tasks';
import { Swipeable } from 'react-native-gesture-handler';
import LeftAction from '../Action/LeftAction';
import { DateChip, ListChip, SubTaskChip } from '../Chip';
import { deleteTasks } from '@/app/redux/tasks/slice';

interface TaskTileProps extends TodayScreenProps {
    item: Task,
    index: number,
}

const TaskTile: FC<TaskTileProps> = ({ item, index, navigation }) => {
    const dispatch = useAppDispatch();
    const select = useAppSelector(isSelecting);
    const selectedTiles = useAppSelector(getSelectedTiles);
    const initialLongPressed = selectedTiles.some(tileId => tileId === item._id);

    const [isChecked, setChecked] = useState(false);
    const [longPressed, setLongPressed] = useState(initialLongPressed);

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

        if (shouldVibrate) { Vibration.vibrate(50) }

    }, [dispatch, item._id]);


    useEffect(() => {
        if (!select) {
            setLongPressed(false)
        }
    }, [select])

    const handleSwipeableOpen = (direction: string) => {
        if (direction === 'left') {
            //dispatch(deleteTasks([item._id]))

            console.log(`Deleted ${JSON.stringify(item.title)}`)
        }
    };


    return (
        <Swipeable
            renderLeftActions={(progess, drag, swipe) => {

                //console.log(progess);

                return (
                    <LeftAction
                        progressAnimatedValue={progess}
                        dragAnimatedValue={drag}
                        swipeable={swipe}
                        id={item._id}
                    />
                )
            }}
            onSwipeableOpen={handleSwipeableOpen}
            friction={1.5}
            leftThreshold={width / 4}
        >
            <Animated.View>
                <Pressable
                    style={[styles.container, longPressed && styles.selectedStyle]}
                    onPress={onPress}
                    delayLongPress={250}
                    onLongPress={() => onLongPress(true)}
                >
                    <Pressable style={styles.checkBoxPressable} onPress={() => setChecked(!isChecked)} >
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                    </Pressable>
                    <View style={styles.textContainer}>
                        <AppText
                            numberOfLines={1}
                            style={styles.title}
                            key={item._id}
                        >
                            {item.title}
                        </AppText>
                        {item.description.length > 0 &&
                            <AppText numberOfLines={1} style={styles.desc} >
                                {item.description}
                            </AppText>
                        }
                        <View style={styles.subContainer}>
                            {
                                item.due_date &&
                                <>
                                    <DateChip date={getDate(item.due_date)} />
                                    <View style={styles.divider} />
                                </>
                            }
                            {
                                item.subtasks && item.subtasks.length > 0 &&
                                <>
                                    <SubTaskChip length={item.subtasks?.length} />
                                    <View style={styles.divider} />
                                </>
                            }
                            <ListChip />
                        </View>
                    </View>
                    <Ionicons
                        size={22}
                        style={styles.arrowIcon}
                        name={"arrow-forward-outline"}
                    />
                </Pressable>
            </Animated.View>
        </Swipeable>
    );
}

export default TaskTile;

const styles = StyleSheet.create({

    selectedStyle: {
        backgroundColor: addOpacity(Colors.listTextBackground, 1),
    },
    container: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginHorizontal: 4,
        paddingTop: 3,
        paddingBottom: 10,
        paddingHorizontal: 8,
        backgroundColor: Colors.white
    },
    checkBoxPressable: {
        paddingTop: 7,
        paddingLeft: 6,
        paddingRight: 12,
        paddingBottom: 15,
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
        flexShrink: 1
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
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 3
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

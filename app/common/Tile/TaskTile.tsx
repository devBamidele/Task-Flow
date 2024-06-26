import { Pressable, StyleSheet, View, Vibration } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AppText from '../Text/AppText';
import { Colors, TodayScreenProps, addOpacity, getDate } from '@/app/utils';
import { Task } from '@/app/redux/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms, s } from 'react-native-size-matters';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getSelectedTiles, isSelecting, updateSelecting } from '@/app/redux/tasks';

interface TaskTileProps extends TodayScreenProps {
    item: Task,
    index: number,
}

const TaskTile: FC<TaskTileProps> = ({ item, index, navigation }) => {
    const dispatch = useAppDispatch();
    const select = useAppSelector(isSelecting);
    const selectedTiles = useAppSelector(getSelectedTiles);

    // Determine initial value of longPressed based on selectedTiles
    const initialLongPressed = selectedTiles.some(tileId => tileId === item._id); // Replace someId with the ID you're checking

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

        if (shouldVibrate) {
            Vibration.vibrate(50);
        }
    }, [dispatch, item._id]);


    useEffect(() => {
        if (!select) {
            setLongPressed(false)
        }
    }, [select])


    return (
        <Pressable
            style={[styles.container, longPressed && styles.selectedStyle]}
            onPress={onPress}
            delayLongPress={250}
            onLongPress={() => onLongPress(true)} >

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
                            <View style={styles.generic}>
                                <Ionicons
                                    size={20}
                                    name={"calendar"}
                                    style={styles.icon}
                                />
                                <AppText style={styles.dateText}>
                                    {getDate(item.due_date)}
                                </AppText>
                            </View>

                            <View style={styles.divider} />
                        </>

                    }


                    {
                        item.subtasks && item.subtasks.length > 0 &&
                        <>
                            <View style={styles.generic}>
                                <View style={styles.countContainer}>
                                    <AppText style={styles.countText}>
                                        {item.subtasks?.length}
                                    </AppText>
                                </View>

                                <AppText style={styles.dateText}>
                                    Subtasks
                                </AppText>
                            </View>

                            <View style={styles.divider} />
                        </>
                    }



                    <View style={styles.generic}>
                        <View style={[styles.square, { backgroundColor: 'yellow' }]} />

                        <AppText style={styles.dateText}>
                            List 1
                        </AppText>
                    </View>
                </View>
            </View>

            <Ionicons
                size={22}
                style={styles.arrowIcon}
                name={"arrow-forward-outline"}
            />
        </Pressable>
    );
}

export default TaskTile;

const styles = StyleSheet.create({

    selectedStyle: {
        backgroundColor: addOpacity(Colors.listTextBackground, 1),
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
    container: {
        flexDirection: 'row',
        alignItems: "flex-start",
        marginHorizontal: 4,
        paddingTop: 3,
        paddingBottom: 10,
        paddingHorizontal: 8,
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
    icon: {
        paddingLeft: s(3),
        paddingRight: ms(3),
        color: Colors.textColor3,
    },
    dateText: {
        fontSize: ms(11),
        color: addOpacity(Colors.black, 0.7),
    },
    arrowIcon: {
        marginRight: 6,
        marginTop: 6,
        marginLeft: 12,
        color: Colors.textColor4,
    },

    generic: {
        flexDirection: "row",
        alignItems: "center",
    },

    divider: {
        width: StyleSheet.hairlineWidth,
        height: '100%',
        backgroundColor: Colors.divider,
        marginRight: ms(10),
        marginLeft: ms(7),
        marginTop: ms(2),
    },

    square: {
        width: ms(13),
        height: ms(13),
        borderRadius: 4,
        marginTop: ms(2),
        marginRight: ms(4),
    },

});

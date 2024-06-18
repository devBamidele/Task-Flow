import { Pressable, StyleSheet, View } from 'react-native';
import React, { FC, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AppText from '../Text/AppText';
import { Colors, TodayScreenProps, addOpacity, weight } from '@/app/utils';
import { Task } from '@/app/redux/tasks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ms, s } from 'react-native-size-matters';

interface AppTileProps extends TodayScreenProps {
    item: Task,
    index: number,
}

const AppTile: FC<AppTileProps> = ({ item, index, navigation }) => {

    const onPress = () => {
        navigation.navigate('Task', item);
    };

    const [isChecked, setChecked] = useState(false);

    return (
        <Pressable style={styles.container} onPress={onPress} >

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
                    <View style={styles.generic}>
                        <Ionicons
                            size={20}
                            name={"calendar"}
                            style={styles.icon}
                        />
                        <AppText style={styles.dateText}>
                            22-03-22
                        </AppText>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.generic}>
                        <View style={styles.countContainer}>
                            <AppText style={styles.countText}>
                                {5}
                            </AppText>
                        </View>

                        <AppText style={styles.dateText}>
                            Subtasks
                        </AppText>
                    </View>

                    <View style={styles.divider} />

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
                color={Colors.textColor4}
            />
        </Pressable>
    );
}

export default AppTile;

const styles = StyleSheet.create({
    countContainer: {
        backgroundColor: Colors.numberContainer,
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
        marginVertical: 5,
        paddingBottom: 4
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
        marginTop: 6
    },

    generic: {
        flexDirection: "row",
        alignItems: "center",
    },

    divider: {
        width: StyleSheet.hairlineWidth,
        height: '100%',
        backgroundColor: Colors.divider,
        marginHorizontal: ms(10),
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

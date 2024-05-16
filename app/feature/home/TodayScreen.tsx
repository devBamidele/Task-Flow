import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddTaskButton, AppText, AppTile } from '@/app/common';
import { Colors, TodayScreenProps, weight } from '@/app/utils';
import { useSelector } from 'react-redux';
import { selectTasks, useGetAllQuery } from '@/app/redux/tasks';
import { moderateScale } from '@/app/utils/metric';


const TodayScreen: FC<TodayScreenProps> = ({ navigation: { toggleDrawer, navigate } }) => {

    const queryOptions = { refetchOnMountOrArgChange: 3600 }

    const { isLoading, isError, error, isSuccess } = useGetAllQuery(undefined, queryOptions);

    const tasks = useSelector(selectTasks);

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={[styles.mainView, { paddingHorizontal: 10 }]} >

                <View style={styles.backButton}>
                    <Pressable onPress={toggleDrawer} >
                        <Ionicons
                            size={28}
                            name={"menu-outline"}
                            color={Colors.textColor1}
                            style={{ padding: 6 }}
                        />
                    </Pressable>

                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <AppText fontWeight={weight.M} style={styles.headerText}>
                            Today
                        </AppText>

                        <View style={styles.undoneCount}>
                            <AppText style={{ fontSize: 15 }}>
                                5
                            </AppText>
                        </View>
                    </View>
                </View>


                <View style={{ paddingHorizontal: 14, marginTop: 28 }}>
                    <AddTaskButton onPress={() => navigate('Task')} buttonText='Add New Task' />
                </View>


                { isLoading &&
                    <View style={styles.center} >
                        <ActivityIndicator
                            color={Colors.primary}
                            size={moderateScale(22)}
                        />
                    </View>
                }

                {isError &&
                    <View style={styles.center} >
                        <AppText>
                            An error occurred
                        </AppText>
                    </View>
                }

                <View style={styles.taskList}>
                    {isSuccess && (
                        <FlatList
                            data={tasks}
                            keyExtractor={(task) => task._id}
                            renderItem={({ item, index }) => (
                                <AppTile item={item} index={index} />
                            )}
                            ItemSeparatorComponent={() =>
                                <View
                                    style={styles.seperator}
                                />
                            }
                        />
                    )}
                </View>


            </View>
        </SafeAreaView>
    )
}

export default TodayScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },

    center: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },

    backButton: {
        marginTop: 20,
        marginLeft: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    undoneCount: {
        borderColor: Colors.divider,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 8,
        marginLeft: 4
    },

    headerText: {
        fontSize: 27,
        marginLeft: 5,
    },

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.divider,
        marginHorizontal: 6,
       
    },

    checkbox: {
        margin: 8,
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: 1.5,
    },

    taskList: {
        marginHorizontal: 6
    }

})
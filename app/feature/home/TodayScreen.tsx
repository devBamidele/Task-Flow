import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddTaskButton, AppText, AppTile } from '@/app/common';
import { Colors, TodayScreenProps, weight } from '@/app/utils';
import { selectTasks, useGetAllQuery } from '@/app/redux/tasks';
import { moderateScale } from '@/app/utils/metric';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { onlineState } from '@/app/redux/user/slice';
import { api } from '@/app/redux/api';
import { tasksApi } from '@/app/redux/tasks/service';


const TodayScreen: FC<TodayScreenProps> = ({ navigation, route }) => {

    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useAppDispatch();

    const { isLoading, isError, error, isSuccess, data, refetch } = useGetAllQuery();

    const online = useAppSelector(onlineState);

    const tasks = useAppSelector(selectTasks);

    const onRefresh = useCallback(async () => {

        setRefreshing(true);

        const result = await refetch();

        // Useful for logging purposes
        //console.log(`The reult from the data is ${JSON.stringify(result)}`)

        setRefreshing(false);

    }, []);

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={[styles.mainView, { paddingHorizontal: 10 }]} >

                <View style={styles.backButton}>
                    <Pressable onPress={navigation.toggleDrawer} >
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


                <View style={{ paddingHorizontal: 12, marginTop: 24 }}>
                    <AddTaskButton onPress={() => navigation.navigate('Task')} buttonText='Add New Task' />
                </View>


                {isLoading &&
                    <View style={styles.center} >
                        <ActivityIndicator
                            color={Colors.primary}
                            size={moderateScale(22)}
                        />
                    </View>
                }

                {isError && online &&
                    <View style={styles.center} >
                        <AppText>
                            {isSuccess ? 'Is success' : 'Not success'}
                        </AppText>
                    </View>
                }

                <View style={styles.taskList}>
                    {(data !== undefined &&
                        <FlatList
                            data={tasks}
                            keyExtractor={(task) => task._id}
                            renderItem={({ item, index }) => (
                                <AppTile item={item} index={index} navigation={navigation} route={route} />
                            )}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            ItemSeparatorComponent={() =>
                                <View
                                    style={styles.seperator}
                                />
                            }
                            showsVerticalScrollIndicator={false}
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
        marginVertical: 0
    },

    checkbox: {
        margin: 8,
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: 1.5,
    },

    taskList: {
        marginHorizontal: 4
    }

})
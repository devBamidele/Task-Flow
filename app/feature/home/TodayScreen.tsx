import { ActivityIndicator, BackHandler, FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { AddTaskButton, AppText, TaskTile } from '@/app/common';
import { Colors, TodayScreenProps, weight, moderateScale } from '@/app/utils';
import { getTasks, hasData, useGetAllQuery } from '@/app/redux/tasks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { onlineState } from '@/app/redux/user/slice';
import { api } from '@/app/redux/api';
import { tasksApi } from '@/app/redux/tasks/service';
import { ms, mvs } from 'react-native-size-matters';
import { clearSelecting, clearTasks, isSelecting } from '@/app/redux/tasks/slice';
import { useFocusEffect } from '@react-navigation/native';


const TodayScreen: FC<TodayScreenProps> = ({ navigation, route }) => {

    const [refreshing, setRefreshing] = useState(false);
    const select = useAppSelector(isSelecting);

    const dispatch = useAppDispatch();

    const { isLoading, isFetching, isError, error, isSuccess, data, refetch } = useGetAllQuery();

    const online = useAppSelector(onlineState);

    const tasks = useAppSelector(getTasks);
    const hasCache = useAppSelector(hasData);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const result = await refetch();
        setRefreshing(false);
    }, []);

    const onBackPressed = () => {
        if (select) {
            dispatch(clearSelecting());
            return true;
        }
        return false;
    };

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPressed);

            return () => backHandler.remove();
        }, [select])
    );


    return (
        <SafeAreaView style={styles.mainView}>
            <View style={[{ paddingHorizontal: 6 }]} >

                <View style={styles.backButton}>
                    <Pressable onPress={navigation.toggleDrawer} >
                        <Ionicons
                            size={28}
                            name={"menu-outline"}
                            color={Colors.textColor1}
                            style={{ paddingLeft: 4 }}
                        />
                    </Pressable>

                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <AppText fontWeight={weight.M} style={styles.headerText}>
                            Today
                        </AppText>

                        <View style={styles.undoneCount}>
                            <AppText style={{ fontSize: ms(9) }}>
                                5
                            </AppText>
                        </View>
                    </View>
                </View>


                <View style={{ paddingHorizontal: mvs(8), marginTop: ms(14) }}>
                    <AddTaskButton onPress={() => navigation.navigate('Task')} buttonText='Add New Task' />
                </View>


                {isFetching && !hasCache &&
                    <View style={styles.center} >
                        <ActivityIndicator
                            color={Colors.primary}
                            size={moderateScale(22)}
                        />
                    </View>
                }

                {isError && !hasCache &&
                    <View style={styles.center} >
                        <AppText>
                            {isSuccess ? 'Is success' : 'Not success'}
                        </AppText>
                    </View>
                }
            </View>

            <View style={styles.taskList}>
                <FlatList
                    data={tasks}
                    keyExtractor={(task) => task._id}
                    renderItem={({ item, index }) => (
                        <TaskTile item={item} index={index} navigation={navigation} route={route} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                />
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
        marginTop: 12,
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
        marginLeft: 4,
        marginBottom: 4,
    },

    headerText: {
        fontSize: ms(22),
        marginLeft: 4,
        marginBottom: 4,
    },

    seperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.divider,
        marginHorizontal: 6,
        //marginBottom: 2,
    },

    checkbox: {
        margin: 8,
        borderColor: Colors.divider,
        borderRadius: 4,
        borderWidth: 1.5,
    },

    taskList: {
        marginHorizontal: 0
    }

})
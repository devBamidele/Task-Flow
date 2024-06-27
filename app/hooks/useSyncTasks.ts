import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch } from './types';
import { getUnSyncedTasks, markTasksAsSynced, useUpdateMutation } from '../redux/tasks';
import { useEffect } from 'react';
import { appStore } from '../redux/store';

const useSyncTasks = () => {
    const dispatch = useAppDispatch();
    const [update] = useUpdateMutation();

    const syncTasks = async (sync: boolean) => {
        const tasksToSync = getUnSyncedTasks(appStore.getState());

        if (tasksToSync.length > 0 && sync) {

            update({ data: tasksToSync }).unwrap()
                .then((_) => dispatch(markTasksAsSynced(tasksToSync.map(task => task._id))))
                .catch((err) => console.log(JSON.stringify(err)))
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => syncTasks(!!state.isInternetReachable));

        const interval = setInterval(() => syncTasks(true), 30000);

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, [update, dispatch]);
};

export default useSyncTasks;

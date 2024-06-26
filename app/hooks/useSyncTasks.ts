import NetInfo from '@react-native-community/netinfo';
import { useAppDispatch, useAppSelector } from './types';
import { getUnSyncedTasks, markTasksAsSynced } from '../redux/tasks';
import { useUpdateMutation } from '../redux/tasks/service';
import { useEffect } from 'react';
import { appStore } from '../redux/store';

const useSyncTasks = () => {
    const dispatch = useAppDispatch();
    const [update] = useUpdateMutation();


    const syncTasks = async (sync: boolean) => {

        console.log('60 seconds have passed')

        const tasksToSync = getUnSyncedTasks(appStore.getState());

        if (tasksToSync.length > 0 && sync) {
            update({ data: tasksToSync }).unwrap()
                .then((res) => {
                    console.log(`Synced updates ${JSON.stringify(res)}`);

                    dispatch(markTasksAsSynced(tasksToSync.map(task => task._id)));
                }).catch((err) => {
                    console.log(JSON.stringify(err));
                })
        }
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => syncTasks(!!state.isInternetReachable));

        const interval = setInterval(() => syncTasks(true), 60000); // Check every minute

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, [ update, dispatch]);
};

export default useSyncTasks;

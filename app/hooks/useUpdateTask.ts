import { updateTasks } from "../redux/tasks";
import { useUpdateMutation } from "../redux/tasks/service";
import { UpdateTaskParams, useAppDispatch } from "./types";
import { fetch } from "@react-native-community/netinfo";

const useUpdateTask = () => {

    const dispatch = useAppDispatch();

    const [update, { isLoading }] = useUpdateMutation();

    const updateTask = (params: UpdateTaskParams) => {

        params.next();

        dispatch(updateTasks(params.data));

        

        // fetch().then(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        // });


        // update(params.data).unwrap()
        //     .then((res) => {

        //         params.next();
        //     }).catch((err) => {

        //         console.log(JSON.stringify(err))
        //     })
    }

    return {
        updateTask,
        isUpdatingTask: isLoading,
    }
}

export default useUpdateTask;

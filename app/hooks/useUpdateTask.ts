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
    }

    return {
        updateTask,
        isUpdatingTask: isLoading,
    }
}

export default useUpdateTask;

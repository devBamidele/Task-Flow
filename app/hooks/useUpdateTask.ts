import { updateTasks } from "../redux/tasks";
import { UpdateTaskParams, useAppDispatch } from "./types";

const useUpdateTask = () => {

    const dispatch = useAppDispatch();

    const updateTask = (params: UpdateTaskParams) => {

        params.next();

        dispatch(updateTasks(params.data));
    }

    return { updateTask }
}

export default useUpdateTask;

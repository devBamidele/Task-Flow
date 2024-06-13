import { useUpdateMutation } from "../redux/tasks/service";
import { UpdateTaskParams, useAppDispatch } from "./types";

const useUpdateTask = () => {

    const dispatch = useAppDispatch();

    const [update, { isLoading }] = useUpdateMutation();

    const updateTask = (params: UpdateTaskParams) => {

        update(params.data).unwrap()
            .then((res) => {

                params.next();
            }).catch((err) => {

                console.log(JSON.stringify(err))
            })
    }

    return {
        updateTask,
        isUpdatingTask : isLoading,
    }
}

export default useUpdateTask;

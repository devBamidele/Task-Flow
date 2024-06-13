import { AddTaskPayload, useAddMutation } from "../redux/tasks";
import { CreateTaskParams, FetchError, useAppDispatch } from "./types";


const useCreateTask = () => {

    const dispatch = useAppDispatch();

    const [add, { isLoading }] = useAddMutation();

    const createTask = (params: CreateTaskParams) => {

        add(params.data).unwrap()
            .then((res) => {

                params.next();

            }).catch((err) => {

                console.log(JSON.stringify(err))

            })
    }

    return {
        createTask,
        isCreatingTask : isLoading,
    };
};

export default useCreateTask;
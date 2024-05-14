import Endpoints from "@/app/api/endpoints";
import { api } from "../api";
import { AddTaskQuery, AddTaskResponse, Task, TaskResponse } from "./service.types";

export const tasksApi = api.injectEndpoints({

    endpoints: builder => ({
        getAll: builder.query<Task[], void>({

            query: () => ({ url: Endpoints.taskGetAll, method: 'GET' }),

            transformResponse: async (baseQueryReturnValue: TaskResponse) => baseQueryReturnValue.tasks,

        }),
        add: builder.mutation<AddTaskResponse, AddTaskQuery>({
            query: (body) => ({ url: Endpoints.taskAdd, method: 'POST', body })
        }),
    })
});

const { useGetAllQuery, useAddMutation } = tasksApi;

export {
    useGetAllQuery,
    useAddMutation,
};

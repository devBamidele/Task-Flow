import Endpoints from "@/app/api/endpoints";
import { api } from "../api";
import { AddTaskPayload, AddTaskResponse, Task, TaskResponse, UpdateTaskPayload, UpdateTaskResponse } from "./service.types";

const taskType = 'Tasks';
const id = 'LIST';

export const tasksApi = api.injectEndpoints({
    endpoints: builder => ({
        getAll: builder.query<Task[], void>({
            query: () => Endpoints.taskGetAll,

            providesTags: (result) => 
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Tasks' as const, id: _id })),
                        ...result.flatMap(task => 
                            task.subtasks?.map(subtask => ({ type: 'SubTasks' as const, id: subtask._id })) ?? []
                        ),
                        { type: taskType, id },
                    ]
                    : [{ type: taskType, id }],

            transformResponse: async (baseQueryReturnValue: TaskResponse) => baseQueryReturnValue.tasks,
        }),
        add: builder.mutation<AddTaskResponse, AddTaskPayload>({
            query: (body) => ({ url: Endpoints.taskAdd, method: 'POST', body }),

            invalidatesTags: [{ type: taskType, id }]
        }),

        update: builder.mutation<UpdateTaskResponse, UpdateTaskPayload>({
            query: (body) => ({ url: Endpoints.taskUpdate, method: 'PATCH', body }),

            invalidatesTags: (_result, _error, { _id, subtasks }) => [
                { type: taskType, id: _id },
                ...(subtasks?.map(subtask => ({ type: 'SubTasks' as const, id: subtask._id })) ?? []),
                { type: taskType, id }
            ]
        })
    })
});

const { useGetAllQuery, useAddMutation, useUpdateMutation } = tasksApi;

export {
    useGetAllQuery,
    useAddMutation,
    useUpdateMutation,
};

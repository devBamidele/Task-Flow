export { useAddMutation, useGetAllQuery } from "./service";

export type { BaseTask, AddTaskQuery, Task, TaskResponse, AddTaskResponse } from "./service.types";

export { selectTasks, updateTasks } from "./slice";

export { default as taskReducer } from "./slice";

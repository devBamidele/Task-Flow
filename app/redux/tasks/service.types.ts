
interface BaseResponse {
    message: string,
}
interface BaseTask {
    title: string,
    description: string,
}

export interface AddTaskPayload extends BaseTask {
    subtasks?: SubTask[]
}

export interface Task extends BaseTask {
    _id: string,
    subtasks?: SubTask[],
}

export interface SubTask {
    _id: string,
    task: string,
}

export interface UpdateTaskPayload {
    _id: string,
    title?: string,
    description?: string,
    subtasks?: SubTask[] // Keep your head up for task?
}

export interface TaskResponse {
    tasks: Task[],
}

export interface AddTaskResponse extends BaseResponse { }

export interface UpdateTaskResponse extends BaseResponse { }

interface BaseResponse {
    message: string,
}
interface BaseTask {
    title: string,
    description: string,
}

export interface AddTaskPayload extends BaseTask { }

export interface Task extends BaseTask {
    _id: string
}

export interface UpdateTaskPayload {
    _id: string,
    title?: string,
    description?: string,
}

export interface TaskResponse {
    tasks: Task[],
}

export interface AddTaskResponse extends BaseResponse { }

export interface UpdateTaskResponse extends BaseResponse { }
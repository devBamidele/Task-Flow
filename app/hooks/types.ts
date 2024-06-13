import { useDispatch, useSelector } from "react-redux";
import { LoginPayload } from "../redux/auth/service.types";
import { AppDispatch, RootState } from "../redux/store";
import { AddTaskPayload, UpdateTaskPayload } from "../redux/tasks";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

interface NextAction {
    next: VoidFunction,
}

export interface loginUserParams extends NextAction {
    data: LoginPayload,
}

export interface CreateTaskParams extends NextAction {
    data: AddTaskPayload,
}

export interface UpdateTaskParams extends NextAction {
    data: UpdateTaskPayload,
}

export interface loginError {
    data: { error: string },
    status: number
}

export interface FetchError {
    status: string;
    error: string;
}

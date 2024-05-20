import { useDispatch, useSelector } from "react-redux";
import { LoginPayload } from "../redux/auth/service.types";
import { AppDispatch, RootState } from "../redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export interface loginUserParams {
    data: LoginPayload,
    next: VoidFunction,
}

export interface loginError {
    data: { error: string },
    status: number
}

export interface FetchError {
    status: string;
    error: string;
}

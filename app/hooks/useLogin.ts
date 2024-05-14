import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/auth/service";
import showToast from "../common/Toast/showToast";
import { loginError, loginUserParams } from "./types";
import { updateUserData } from "../redux/user/slice";

const useLoginUser = () => {

    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();


    const loginUser = (params: loginUserParams) => {

        login(params.data).unwrap()
            .then((res) => {

                const { message, data, token } = res || {};

                dispatch(updateUserData({ ...data, token }));

                params.next();

            })
            .catch((err: loginError) => {

                showToast({
                    title: 'Oops ',
                    message: err.data.error,
                })

            })
    }

    return {
        loginUser,
        isLoading,
    };
};

export default useLoginUser;
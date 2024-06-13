import { useLoginMutation } from "../redux/auth/service";
import showToast from "../common/Toast/showToast";
import { FetchError, loginError, loginUserParams } from "./types";
import { updateUserData } from "../redux/user/slice";
import { updateTokens } from "../redux/auth/slice";
import { useAppDispatch } from "./types";
import { isLoginError } from "../utils";

const useLoginUser = () => {

    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();


    const loginUser = (params: loginUserParams) => {

        login(params.data).unwrap()
            .then((res) => {

                const { message, data, tokens } = res || {};

                dispatch(updateUserData({ ...data }));

                dispatch(updateTokens({ ...tokens }))

                params.next();

            })
            .catch((err: loginError | FetchError) => {

                console.log(JSON.stringify(err))

                if (isLoginError(err)) {
                    showToast({
                        title: 'Oops',
                        message: err.data.error,
                    });
                } else {
                    showToast({
                        title: 'Network Error',
                        message: err.error,
                    });
                }
            });
            
    }

    return {
        loginUser,
        isLoading,
    };
};

export default useLoginUser;
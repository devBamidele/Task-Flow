import showToast from "../common/Toast/showToast";
import { useSignUpMutation } from "../redux/auth/service";
import { isError } from "../utils";
import { FetchError, signUpError, signUpUserParams, useAppDispatch } from "./types";

const useSignupUser = () => {

    const dispatch = useAppDispatch();
    const [signUp, { isLoading }] = useSignUpMutation();

    const signUpUser = (params: signUpUserParams) => {

        signUp(params.data).unwrap()
            .then((res) => {
                const { message } = res;

                showToast({
                    title: 'Registered Successfully',
                    message, type: 'success',
                })

                params.next();
            }).catch((err: signUpError | FetchError) => {
                console.log(JSON.stringify(err));

                if (isError(err)) {
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
            })

    }

    return {
        signUpUser,
        isLoading,
    }
}

export default useSignupUser;
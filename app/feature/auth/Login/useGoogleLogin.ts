import { useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { EnvVars, isError, isGoogleSignInError } from "@/app/utils";
import { useValidateTokenMutation } from "@/app/redux/auth/service";
import { BaseError, FetchError, useAppDispatch } from "@/app/hooks/types";
import { showToast } from "@/app/common";
import { updateTokens } from "@/app/redux/auth/slice";
import { updateUserData } from "@/app/redux/user/slice";


GoogleSignin.configure({
    webClientId: EnvVars.Google_ID.web,
    iosClientId: EnvVars.Google_ID.iOS,
    scopes: ['profile', 'email'],
});

const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
};


const useGoogleLogin = () => {

    const dispatch = useAppDispatch();
    const [isGloading, setLoading] = useState(false);
    const [validateToken] = useValidateTokenMutation();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { idToken, user: { email, givenName } } = await GoogleLogin();

            if (idToken) {
                validateToken({ idToken, email }).unwrap()
                    .then((res) => {

                        const { tokens } = res || {};

                        const data = { name: givenName ?? "noName", email }

                        dispatch(updateUserData({ ...data }));

                        dispatch(updateTokens({ ...tokens }))

                    }).catch((err: BaseError | FetchError) => {

                        if (isError(err)) {
                            showToast({
                                title: 'Oops',
                                message: 'An error occurred while attempting to login with Google'
                            })
                        } else {
                            showToast({
                                title: 'Network Error',
                                message: err.error,
                            });
                        }

                    })
            }
        } catch (error) {
            if (isGoogleSignInError(error)) {
                if (error.code === '12501') {
                    showToast({
                        title: 'Changed your mind?',
                        message: "Sign in action cancelled by the user",
                        type: "info",
                        duration: 3000,

                    })
                } else {
                    console.log('It is a google based error')
                }
            } else {
                console.log('An error occurred') // Test during networking
            }
        } finally {
            setLoading(false);
        };
    }

    return {
        handleGoogleLogin,
        isGloading,
    }

}

export default useGoogleLogin;

import { loginError } from "../hooks/types";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validateEmail(email: string) {
    return email.trim().length > 0 && emailRegex.test(email);
}

function validatePassword(password : string) {
    if (password.length < 8) {
        return 'Password should be at least 8 characters long';
    }

    if (!/\d/.test(password)) {
        return 'Add at least one number';
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return 'Include both upper and lower case letters';
    }

    // if (!/[^A-Za-z0-9]/.test(password)) {
    //     return 'Include at least one special character';
    // }

    return null; // Password is valid
}

function isLoginError(error: any): error is loginError {
    return (error as loginError).data !== undefined;
}


export {
    validateEmail,
    validatePassword,
    isLoginError,
}
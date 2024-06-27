import { BaseError, GoogleSignInError, loginError } from "../hooks/types";


const nameRegex = /^[a-zA-Z\s'-]+$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function validateEmail(email: string) {
    return email.trim().length > 0 && emailRegex.test(email);
}

function validateName(name: string) {
    const trimmedName = name.trim();

    if (trimmedName.length === 0) {
        return 'Name cannot be empty';
    }

    if (trimmedName.length < 5) {
        return 'Name should be at least 5 characters long';
    }

    if (!nameRegex.test(trimmedName)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    return null; // Name is valid
}


function validatePassword(password: string) {
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

function isError<T extends BaseError>(error: any): error is T {
    return (error as T).data !== undefined;
}

type ErrorCode = Partial<GoogleSignInError>;

function isGoogleSignInError(error: any): error is ErrorCode {
    return (error as ErrorCode).code !== undefined;
}

function getDate(date?: Date | string, toIso: boolean = false): string {
    let dateObject: Date;

    if (date instanceof Date) {
        dateObject = date;
    } else if (typeof date === "string") {
        dateObject = new Date(date);
    } else {
        dateObject = new Date();
    }

    return toIso ? dateObject.toISOString() : dateObject.toDateString();
}

export {
    validateName,
    validateEmail,
    validatePassword,
    isError,
    isGoogleSignInError,
    getDate,
}
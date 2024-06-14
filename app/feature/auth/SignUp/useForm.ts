import { validateEmail, validateName, validatePassword } from "@/app/utils";
import { useRef, useState } from "react";
import { TextInput } from "react-native";


interface SignUpFormState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string,
    isNameValid: string | null,
    isEmailValid: boolean;
    isPasswordValid: string | null;
    isPasswordMatch: boolean,
    listener: boolean;
}

const initialState: SignUpFormState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isNameValid: null,
    isEmailValid: true,
    isPasswordValid: null,
    isPasswordMatch: true,
    listener: false,
};

const useForm = () => {

    const [state, setState] = useState<SignUpFormState>(initialState);

    const passwordInputRef = useRef<TextInput>(null);
    const emailInputRef = useRef<TextInput>(null);
    const confirmPasswordInputRef = useRef<TextInput>(null);

    const checkCredentials = () => {
        const listener = state.listener;

        const isNameValid = validateName(state.name);
        const isEmailValid = validateEmail(state.email);
        const isPasswordValid = validatePassword(state.password);
        const isPasswordMatch = state.password === state.confirmPassword;

        setState(prevState => ({ ...prevState, isNameValid, isEmailValid, isPasswordValid, isPasswordMatch }))

        return [listener, !isNameValid, isEmailValid, !isPasswordValid, isPasswordMatch].every(Boolean);
    }

    const listen = () => setState(prevState => ({ ...prevState, listener: true }))

    const setName = (name: string) => setState(prevState => ({ ...prevState, name }))
    const setEmail = (value: string) => setState(prevState => ({ ...prevState, email: value.trim() }))
    const setPassword = (password: string) => setState(prevState => ({ ...prevState, password }))
    const setConfirmPassword = (confirmPassword: string) => setState(prevState => ({ ...prevState, confirmPassword }))

    const clearForm = () => setState(initialState);

    return { ...state, passwordInputRef, emailInputRef, confirmPasswordInputRef, checkCredentials, listen, setName, setEmail, setPassword, setConfirmPassword, clearForm };
}

export { useForm };

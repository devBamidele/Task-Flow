import { validateEmail, validatePassword } from "@/app/utils";
import { useRef, useState } from "react";
import { TextInput } from "react-native";

interface LoginFormState {
  email: string;
  password: string;
  isEmailValid: boolean;
  isPasswordValid: string | null;
  listener: boolean;
}

const initialState: LoginFormState = {
  email: '',
  password: '',
  isEmailValid: true,
  isPasswordValid: null,
  listener: false,
};


const useForm = () => {
  const [state, setState] = useState<LoginFormState>(initialState);
  const passwordInputRef = useRef<TextInput>(null);

  const checkCredentials = () => setState(prevState => ({
    ...prevState,
    isEmailValid: validateEmail(state.email),
    isPasswordValid: validatePassword(state.password)
  }))

  const listen = () => setState(prevState => ({ ...prevState, listener: true }))

  const setEmail = (value: string) => setState(prevState => ({ ...prevState, email: value.trim() }))
  const setPassword = (password: string) => setState(prevState => ({ ...prevState, password }))

  const clearForm = () => setState(initialState);

  return { ...state, passwordInputRef, checkCredentials, listen, setEmail, setPassword, clearForm };
};

export { useForm };


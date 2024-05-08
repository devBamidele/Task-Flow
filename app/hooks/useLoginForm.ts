import { validateEmail, validatePassword } from "@/app/utils";
import { useRef, useState } from "react";
import { TextInput } from "react-native";

interface LoginFormState {
  email: string;
  password: string;

  isEmailValid: boolean;
  isPasswordValid: string | null;
  listener: boolean;
  visible: boolean;
  message: string;
}

const initialState: LoginFormState = {
  email: '',
  password: '',
  isEmailValid: true,
  isPasswordValid: null,
  listener: false,
  visible: false,
  message: '',
};


const useLoginForm = () => {
  const [state, setState] = useState<LoginFormState>(initialState);
  const passwordInputRef = useRef<TextInput>(null);

  const checkEmail = () => setState(prevState => ({ ...prevState, isEmailValid: validateEmail(state.email) }));
  const checkPassword = () => setState(prevState => ({ ...prevState, isPasswordValid: validatePassword(state.password) }));

  const toggleSnackbar = () => setState(prevState => ({ ...prevState, visible: !prevState.visible }));
  const listen = () => setState(prevState => ({ ...prevState, listener: true }))
  
  const setEmail = (value: string) => setState(prevState => ({ ...prevState, email: value.trim() }))
  const setPassword = (password: string) => setState(prevState => ({ ...prevState, password }))

  const setMessage = (message: string) => setState(prevState => ({ ...prevState, message }))

  const remove = () => setState(prevState => ({ ...prevState, visible: false }))

  const clearForm = () => setState(initialState);

  return { ...state, passwordInputRef, checkEmail, checkPassword, toggleSnackbar, listen, setEmail, setPassword, setMessage, remove, clearForm };
};

export { useLoginForm };


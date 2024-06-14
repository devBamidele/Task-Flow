
import Toast, { ToastType } from 'react-native-toast-message';

interface ToastProps {
    title: string,
    message: string,
    type?: ToastType,
    duration?: number
}

export default function showToast(props: ToastProps) {

    const { type = 'error', title, message, duration = 3000 } = props

    Toast.show({
        type,
        text1: title,
        text2: message,
        position: 'top',
        visibilityTime: duration,
        bottomOffset: 30,
    });
}


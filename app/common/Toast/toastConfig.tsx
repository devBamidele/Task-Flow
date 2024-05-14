import React from 'react';
import { BaseToastProps } from 'react-native-toast-message';
import AppToast from './AppToast';

export const toastConfig = {
    success: (props: BaseToastProps) => <AppToast type='success' props={props} />,

    error: (props: BaseToastProps) => <AppToast type='error' props={props} />,

    info: (props: BaseToastProps)=> <AppToast type='info' props={props} />,
}
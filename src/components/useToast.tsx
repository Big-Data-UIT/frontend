import { useState, useEffect } from "react";
import { Alert, Color } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
interface ToastState {
    isOpen: boolean;
    text?: string;
    type?: string;
}
const useToast = () => {
    const [state, setState] = useState<ToastState>({ isOpen: false, text: "", type: "" });
    const { isOpen, text, type } = state;

    const show = (message: any) => {
        setState({ isOpen: true, ...message });
    };

    const hide = () => setState({ isOpen: false, text: "" });

    const error = (message: string) => {
        show({ type: 'error', text: message });
    };

    const warn = (message: string) => {
        show({ type: 'warning', text: message });
    };

    const info = (message: string) => {
        show({ type: 'info', text: message });
    };

    const success = (message: string) => {
        show({ type: 'success', text: message });
    };
    return <Snackbar open={isOpen} autoHideDuration={3000} onClose={hide} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }} >
        <Alert elevation={6} variant="filled" onClose={hide} severity={type as Color}>
            {text}
        </Alert>
    </Snackbar>
}

export default useToast;
import { useState, useEffect } from "react";
import { Alert, Color } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
interface ToastState {
    isOpen: boolean;
    text?: string;
    type?: string;
    handleSuccess: Function
}
const Toast = (props : ToastState) => {
    console.log('run toast');
    const { isOpen, text, type,handleSuccess } = props;
    const [open, setOpen] = useState(isOpen);
    const hide = () => {
        setOpen(false)
        handleSuccess();
    };
    return <Snackbar open={open} autoHideDuration={3000} onClose={hide} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }} >
        <Alert elevation={6} variant="filled" onClose={hide} severity={type as Color}>
            {text}
        </Alert>
    </Snackbar>
}

export default Toast;
// A simple snackbar component
import React from "react";
import {
    Snackbar, Alert
} from '@mui/material'


export function SnackBarComponent({
    open,
    handleClose,
    msg,
    sever
}) {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={sever} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

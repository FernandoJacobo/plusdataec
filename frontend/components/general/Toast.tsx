import { Toaster, toast } from "react-hot-toast";

import { ReactNode } from "react";

type ToastType = 'success' | 'error' | 'loading';

const showToast = (
    message: string,
    type: ToastType = 'success'
) => {

    const options = {
        duration: 4000,
    };

    if (type === 'success') {
        toast.success(message, options);
    } else if (type === 'error') {
        toast.error(message, options);
    } else {
        toast.loading(message, options);
    }
};

const Toast = () => {
    return <Toaster position="top-right" />;
};

export { Toast, showToast };
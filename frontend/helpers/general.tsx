import Swal from 'sweetalert2';

export const numberToPercent = (number: number) => {
    const percent = number * 100;
    return `${percent.toFixed(2)} %`;
}

export const numberFormat = (number: number, decimals: number = 2) => {
    return number.toFixed(decimals)
}

interface AlertTypes {
    title: string;
    message: string;
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'
}

export const showAlert = ({ title, message, icon = 'success' }: AlertTypes) => {
    Swal.fire({
        title: title,
        icon: icon,
        html: message,
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: ``,
        confirmButtonAriaLabel: ``,
        cancelButtonText: ``,
        cancelButtonAriaLabel: ``
    });
}
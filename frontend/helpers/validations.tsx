export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

export const isValidRuc = (ruc: string): boolean => {
    const rucRegex = /^\d{13}$/;
    return rucRegex.test(ruc);
}

export const isValidDecimalNumber = (number: string): boolean => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(number);
}
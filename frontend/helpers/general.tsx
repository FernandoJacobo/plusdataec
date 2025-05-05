export const numberToPercent = (number: number) => {
    const percent = number * 100;
    return `${percent.toFixed(2)} %`;
}

export const numberFormat = (number: number, decimals: number = 2) => {
    return number.toFixed(decimals)
}
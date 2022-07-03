export const roundStr = (str: string, max: number = 20): string => {
    return str.length > max ? str.substring(0, max) : str;
}

export const isEmptyObj = (obj: Object): boolean => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

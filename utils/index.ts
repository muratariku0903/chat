export const roundStr = (str: string, max: number = 20): string => {
    return str.length > max ? str.substring(0, max) : str;
}

export const isEmptyObj = (obj: Object): boolean => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const arrRand = <T>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)];
}

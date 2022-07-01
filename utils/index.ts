export const roundStr = (str: string, max: number = 20): string => {
    return str.length > max ? str.substring(0, max) : str;
}

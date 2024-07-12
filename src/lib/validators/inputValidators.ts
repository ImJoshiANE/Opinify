export const validateSpaceName = (input: string): boolean => {
    const hasNoSpaces = !/\s/.test(input);
    const lengthValid = input.length >= 3 && input.length <= 21;
    const validChars = /^[a-zA-Z0-9_-]+$/.test(input);

    return hasNoSpaces && lengthValid && validChars;
}
function isError(error: unknown, name?: string): error is Error {
    return error instanceof Error && (name === undefined || error.name === name);
}

export function isExactError<ErrorType extends Error>(
    error: unknown,
    errorConstructor: new (...args: any[]) => ErrorType,
): error is ErrorType {
    return isError(error, errorConstructor.name);
}

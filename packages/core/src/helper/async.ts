export function isPromise(value: unknown): value is Promise<unknown> {
    return value instanceof Promise
}

export function sleep(milliseconds: number) {
    return new Promise(res => setTimeout(res, milliseconds))
}

export async function map<T, K>(array: readonly T[], asyncMapFunc: (item: T, index: number) => Promise<K>): Promise<K[]> {
    if (!array)
        return []
    const result = []
    let index = 0
    for (const value of array) {
        const newValue = await asyncMapFunc(value, index++)
        result.push(newValue)
    }
    return result
}

export function tryit<Args extends any[], Return>(func: (...args: Args) => Return) {
    return (
        ...args: Args
    ): Return extends Promise<any>
        ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
        : [Error, undefined] | [undefined, Return] => {
        try {
            const result = func(...args)
            if (isPromise(result)) {
                return result
                    .then(value => [undefined, value])
                    .catch(err => [err, undefined]) as Return extends Promise<any>
                    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
                    : [Error, undefined] | [undefined, Return]
            }
            return [undefined, result] as Return extends Promise<any>
                ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
                : [Error, undefined] | [undefined, Return]
        }
        catch (err) {
            return [err as any, undefined] as Return extends Promise<any>
                ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
                : [Error, undefined] | [undefined, Return]
        }
    }
}
/**
 * withResolvers
 * ```ts
 * const { promise, resolve, reject } = withResolvers<T>();
 * ```
 */
export function withResolvers<T = void>(): {
    promise: Promise<T>
    resolve: (value: T) => void
    reject: (reason?: any) => void
} {
    let resolve!: (value: T) => void
    let reject!: (reason?: any) => void
    const promise = new Promise<T>((res, rej) => {
        resolve = res
        reject = rej
    })
    return { promise, resolve, reject }
}

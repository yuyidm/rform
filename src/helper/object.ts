export function isNil(obj: any) {
    if (obj === null || obj === undefined) {
        return true
    }
    return false
}

export function isEmpty(obj: any) {
    if (typeof obj === 'object') {
        return Object.keys(obj).length === 0
    }
    if (typeof obj === 'string') {
        return obj.length === 0
    }
    if (Array.isArray(obj)) {
        return obj.length === 0
    }
    if (isNil(obj)) {
        return true
    }
}

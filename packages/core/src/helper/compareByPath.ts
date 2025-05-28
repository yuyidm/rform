import type { FromPath } from './path'

interface Props {
    path?: FromPath
    [key: string]: any
}

export function compareByPath(prevProps: Props, nextProps: Props) {
    const prevPath = prevProps?.path?.toString?.()
    const nextPath = nextProps?.path?.toString?.()

    if (prevPath !== nextPath) {
        return false
    }

    for (const key in prevProps) {
        if (key === 'path')
            continue
        if (!Object.is(prevProps[key], nextProps[key])) {
            return false
        }
    }

    for (const key in nextProps) {
        if (key === 'path')
            continue
        if (!(key in prevProps)) {
            return false
        }
    }

    return true
}

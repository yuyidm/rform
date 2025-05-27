import { useCallback, useReducer } from 'react'

export function useForceUpdate() {
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    const forceUpdateFun = useCallback(() => {
        forceUpdate()
    }, [])

    return forceUpdateFun
}

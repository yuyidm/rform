import type { StoreApi, UseBoundStore } from 'zustand'
import type { State } from '../helper/createFormStore'
import { useContext, useMemo } from 'react'
import { FormContext } from '../const/context'

export function useForm(form?: UseBoundStore<StoreApi<State>>) {
    const contextForm = useContext(FormContext)
    return useMemo(() => form || contextForm, [])
}

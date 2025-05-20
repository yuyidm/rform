import type { StoreApi, UseBoundStore } from 'zustand'
import type { State } from '@/helper/createFormStore'
import type { ArrayFieldApi } from '@/hooks/useArrayField'
import { createContext } from 'react'

export const FormContext = createContext<UseBoundStore<StoreApi<State>>>(null!)

export const ArrayItemsContext = createContext<ArrayFieldApi>(null!)

export const ArrayItemIndexContext = createContext<number>(null!)

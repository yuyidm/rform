import type { Path } from '@formily/path'
import type { ISchema } from '@/interfaces'
import { produce } from 'immer'
import { create } from 'zustand'

export interface State {
    schema: ISchema
    components: Record<string, any>
    values: Record<string, any>
    errors: Record<string, string>
    touched: Record<string, boolean>
    dirty: boolean
    fields: Record<string, any>

    submitting: boolean
    setFieldValue: (path: Path, value: any) => void
    getFieldValue: (path: Path) => any
    getFieldsValue: () => Record<string, any>
    setFieldError: (path: Path, error: string) => void
    getFieldError: (path: Path) => string
    getFieldsError: () => Record<string, string>
    setField: (path: Path, field: any) => void
}

interface CreateFormStoreOptions {
    initialValues?: Record<string, any>
    components?: Record<string, any>
    schema: ISchema
}

export function createFormStore(options: CreateFormStoreOptions) {
    const {
        initialValues = {},
        components = {},
        schema,
    } = options

    const useFormStore = create<State>()((setState, getState) => ({
        values: initialValues,
        components,
        schema,
        errors: {},
        fields: {},
        touched: {},
        dirty: false,
        submitting: false,

        setFieldValue: (path: Path, value: any) => {
            setState(
                produce((state) => {
                    path.setIn(state.values, value)
                    state.dirty = true
                    path.setIn(state.touched, true)
                }),
            )
        },

        getFieldValue: (path: Path) => {
            return path.getIn(getState().values)
        },

        getFieldsValue: () => {
            return getState().values
        },

        setFieldError: (path: Path, error: string) => {
            setState(
                produce((state) => {
                    path.setIn(state.errors, error)
                }),
            )
        },

        getFieldError: (path: Path) => {
            return path.getIn(getState().errors)
        },

        getFieldsError: () => {
            return getState().errors
        },

        setField: (path, field) => {
            setState(
                produce((state) => {
                    state.fields[path.toString()] = field
                }),
            )
        },
    }))

    return useFormStore
}

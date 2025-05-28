import type { ISchema } from '../interfaces'
import type { FromPath } from './path'
import { produce } from 'immer'
import { create } from 'zustand'
import { map } from './async'

export interface State {
    schema: ISchema
    components: Record<string, any>
    values: Record<string, any>
    errors: Record<string, string>
    touched: Record<string, boolean>
    dirty: boolean
    fields: Record<string, any>

    validating: boolean
    setFieldValue: (path: FromPath, value: any) => void
    getFieldValue: (path: FromPath) => any
    getFieldsValue: () => Record<string, any>
    setFieldError: (path: FromPath, error: string) => void
    getFieldError: (path: FromPath) => string
    getFieldsError: () => Record<string, string>
    getFieldTouched: (path: FromPath) => boolean
    validate: () => Promise<boolean>
    submit: () => Promise<boolean | Record<string, any>>
    setField: (path: FromPath, field: any) => void
}

interface CreateFormStoreOptions {
    initialValues?: Record<string, any>
    components?: Record<string, any>
    schema: ISchema
}

export function createFormStore(options: CreateFormStoreOptions) {
    const {
        components = {},
        schema,
    } = options

    const initialValues = options.initialValues
        ?? schema.default
        ?? (schema.type === 'array'
            ? []
            : (schema.type === 'object'
                    ? {}
                    : undefined
                )
        )

    const useFormStore = create<State>()((setState, getState) => ({
        values: initialValues!,
        components,
        schema,
        errors: {},
        fields: {},
        touched: {},
        dirty: false,
        validating: false,

        setFieldValue: (path: FromPath, value: any) => {
            setState(
                produce((state) => {
                    if (path.toString() === '') {
                        state.values = value
                    }
                    else {
                        path.setIn(state.values, value)
                    }
                    state.dirty = true
                    state.touched[path.toString()] = true
                }),
            )
        },

        getFieldValue: (path: FromPath) => {
            return path.getIn(getState().values)
        },

        getFieldsValue: () => {
            return getState().values
        },

        setFieldError: (path: FromPath, error: string) => {
            setState(
                produce((state) => {
                    state.errors[path.toString()] = error
                }),
            )
        },

        getFieldError: (path: FromPath) => {
            return getState().errors[path.toString()]
        },

        getFieldsError: () => {
            return getState().errors
        },

        getFieldTouched: (path: FromPath) => {
            return getState().touched[path.toString()]
        },

        validate: async () => {
            setState({ validating: true })
            const errors = await map(
                Object.values(getState().fields),
                async ({ validate }) => validate(),
            )
            setState({ validating: false })
            return errors.every(err => !err)
        },

        submit: async () => {
            const isValid = await getState().validate()
            if (!isValid)
                return false
            return getState().getFieldsValue()
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

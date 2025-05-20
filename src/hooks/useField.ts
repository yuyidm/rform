import type { ISchema } from '@/interfaces'
import { Path } from '@formily/path'
import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { resolveSchema } from '@/helper/resolveSchema'
import { useForm } from './useForm'
import { useMemoizedFn } from './useMemoizedFn'

export function useField(path: Path, schema: ISchema) {
    const { deps: _deps = [], default: defaultValue } = schema
    const useBoundStore = useForm()
    const isWrapper = ['array', 'object', 'void'].includes(schema.type)

    const setFieldValue = useBoundStore(state => state.setFieldValue)
    const getFieldValue = useBoundStore(state => state.getFieldValue)
    const getFieldsValue = useBoundStore(state => state.getFieldsValue)
    const setFieldError = useBoundStore(state => state.setFieldError)
    const getFieldError = useBoundStore(state => state.getFieldError)
    const getFieldsError = useBoundStore(state => state.getFieldsError)

    const setValue = useMemoizedFn((val: any) => setFieldValue(path, val))
    const getValue = useMemoizedFn(() => getFieldValue(path))
    const getValues = useMemoizedFn(() => getFieldsValue())

    const getError = useMemoizedFn(() => getFieldError(path))
    const getErrors = useMemoizedFn(() => getFieldsError())

    const value = useBoundStore(useShallow(s => isWrapper ? null : path.getIn(s.values)))
    const error = useBoundStore(useShallow(s => isWrapper ? null : path.getIn(s.errors)))
    const deps = useBoundStore(useShallow(s => _deps.map(dep => Path.parse(dep).getIn(s.values))))
    const components = useBoundStore(useShallow(s => s.components))

    const scope = useMemo(() => ({
        setValue,
        getValue,
        getValues,
        getError,
        getErrors,
    }), [])

    const resolved = resolveSchema(schema, { value, deps, error, components, ...scope })
    const onChange = useMemoizedFn((val: any) => {
        const resolvedValue = resolved.normalize(val)
        setFieldValue(path, resolvedValue)
        resolved.validate(resolvedValue).then((errors) => {
            setFieldError(path, errors)
        })
    })

    return {
        value: resolved.transform(value),
        error,
        defaultValue,
        deps,
        scope,
        onChange,
        ...resolved,
    }
}

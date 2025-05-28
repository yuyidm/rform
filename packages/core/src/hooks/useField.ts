import type { FromPath } from '../helper/path'
import type { ISchema } from '../interfaces'
import { useMemo } from 'react'
import { useShallow } from 'zustand/shallow'
import { isEmpty } from '../helper/object'
import { Path } from '../helper/path'
import { resolveSchema } from '../helper/resolveSchema'
import { useForm } from './useForm'
import { useMemoizedFn } from './useMemoizedFn'

export function useField(path: FromPath, schema: ISchema) {
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

    const value = useBoundStore(useShallow(s => isWrapper ? null : s.getFieldValue(path)))
    const error = useBoundStore(useShallow(s => (isWrapper ? false : s.getFieldError(path)) ?? false))
    const deps = useBoundStore(useShallow(s => _deps.map(dep => s.getFieldValue(Path.parse(dep)))))
    const components = useBoundStore(useShallow(s => s.components))

    const scope = useMemo(() => ({
        setValue,
        getValue,
        getValues,
        setFieldError,
        getError,
        getErrors,
    }), [])

    const resolved = resolveSchema(
        schema,
        { value, deps, error, components, ...scope },
    )
    const onChange = useMemoizedFn((val: any) => {
        const resolvedValue = resolved.normalize(val)
        setFieldValue(path, resolvedValue)
        resolved.validate(resolvedValue).then((errors) => {
            setFieldError(path, errors)
        })
    })

    return {
        value: resolved.transform(value),
        status: !isEmpty(error) ? 'error' : undefined,
        error,
        defaultValue,
        deps,
        scope,
        onChange,
        ...resolved,
    }
}

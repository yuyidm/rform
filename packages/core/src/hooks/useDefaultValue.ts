import type { Path } from '@formily/path'
import type { ISchema } from '../interfaces'
import { useEffect } from 'react'
import { isNil } from '../helper/object'
import { useForm } from './useForm'

export function useDefaultValue(path: Path, schema: ISchema) {
    const useBoundStore = useForm()
    const getFieldTouched = useBoundStore(s => s.getFieldTouched)
    const getFieldValue = useBoundStore(s => s.getFieldValue)
    const setFieldValue = useBoundStore(s => s.setFieldValue)

    const touched = getFieldTouched(path)
    const value = getFieldValue(path)
    const defaultValue = schema.default

    useEffect(() => {
        if (
            !touched
            && isNil(value)
            && !isNil(defaultValue)
        ) {
            setFieldValue(path, schema.default)
        }
    })
}

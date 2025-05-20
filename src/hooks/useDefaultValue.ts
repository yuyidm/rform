import type { Path } from '@formily/path'
import type { ISchema } from '@/interfaces'
import { useEffect } from 'react'
import { isNil } from '@/helper/object'
import { useForm } from './useForm'

export function useDefaultValue(path: Path, schema: ISchema) {
    const useBoundStore = useForm()
    const touched = path.getIn(useBoundStore.getState().touched)
    const value = path.getIn(useBoundStore.getState().values)
    const defaultValue = schema.default

    useEffect(() => {
        if (
            !touched
            && isNil(value)
            && !isNil(defaultValue)
        ) {
            useBoundStore.getState().setFieldValue(path, schema.default)
        }
    })
}

import type { FromPath } from '../helper/path'
import type { ISchema } from '../interfaces'
import { useEffect } from 'react'
import { useField } from './useField'
import { useForm } from './useForm'

export function useSchema(path: FromPath, schema: ISchema) {
    const useBoundStore = useForm()
    const { validate, scope } = useField(path, schema)

    useEffect(() => {
        useBoundStore.getState().setField(path, {
            path,
            validate: async () => {
                return validate(scope.getValue()).then((errors) => {
                    scope.setFieldError(path, errors)
                    return errors
                })
            },
        })
    })
}

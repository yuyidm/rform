import type { Path } from '@formily/path'
import type { ISchema } from '@/interfaces'
import { useEffect } from 'react'
import { useForm } from './useForm'

export function useSchema(path: Path, schema: ISchema) {
    const useBoundStore = useForm()

    useEffect(() => {
        useBoundStore.getState().setField(path, {
            path,
            schema,
        })
    })
}

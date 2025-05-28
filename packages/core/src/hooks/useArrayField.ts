import type { FromPath } from '../helper/path'
import type { ISchema } from '../interfaces'
import { nanoid } from 'nanoid/non-secure'
import { useEffect, useMemo, useRef } from 'react'
import { emptyObjects } from '../const/emptyObjects'
import { useForceUpdate } from './useForceUpdate'
import { useForm } from './useForm'
import { useMemoizedFn } from './useMemoizedFn'

export interface ArrayFieldApi<T = any> {
    push: (item: T) => void
    insert: (index: number, item: T) => void
    remove: (index: number) => void
    move: (from: number, to: number) => void
    replace: (index: number, item: T) => void
    getKey: (index: number) => string
    getItemSchema: (index: number) => ISchema
}

export function useArrayField<T = any>(path: FromPath, schema: ISchema) {
    const useBoundStore = useForm()
    const setFieldState = useBoundStore(s => s.setFieldValue)
    const getFieldValue = useBoundStore(s => s.getFieldValue)
    const forceUpdate = useForceUpdate()

    const defaultValue = schema.default ?? emptyObjects.arr
    const items = schema.items
    const isTuple = Array.isArray(items) && items.length > 0
    const tupleSchemaRef = useRef(isTuple ? [...items] : undefined)

    const length = useBoundStore((s) => {
        if (isTuple) {
            return items.length
        }
        return s.getFieldValue(path)?.length ?? defaultValue.length
    })

    const keyRef = useRef<string[]>(Array.from({ length }).map(() => nanoid()))

    useEffect(() => {
        if (keyRef.current.length !== length) {
            keyRef.current = Array.from({ length }).map((_: any, i: number) => keyRef.current[i] ?? nanoid())
        }
    }, [length])

    const update = useMemoizedFn((newList: T[]) => {
        setFieldState(path, newList)
        forceUpdate()
    })

    const getList = useMemoizedFn(() => [...getFieldValue(path) ?? []])

    const insert = useMemoizedFn((index: number, item: T) => {
        if (isTuple) {
            return
        }
        const list = getList()
        list.splice(index, 0, item)
        keyRef.current.splice(index, 0, nanoid())
        update(list)
    })

    const remove = useMemoizedFn((index: number) => {
        if (isTuple) {
            return
        }
        const list = getList()
        list.splice(index, 1)
        keyRef.current.splice(index, 1)
        update(list)
    })

    const move = useMemoizedFn((from: number, to: number) => {
        const list = getList()

        const newKeys = keyRef.current
        const [item] = list.splice(from, 1)
        const [key] = newKeys.splice(from, 1)

        list.splice(to, 0, item)
        newKeys.splice(to, 0, key)

        update(list)

        if (isTuple) {
            const newTupleSchema = tupleSchemaRef.current!
            const [schema] = newTupleSchema.splice(from, 1)
            newTupleSchema.splice(to, 0, schema)
        }
    })

    const replace = useMemoizedFn((index: number, item: T) => {
        if (isTuple) {
            return
        }
        const list = getList()
        list[index] = item
        update(list)
    })

    const push = useMemoizedFn((item: T) => {
        if (isTuple) {
            return
        }
        const list = getList()
        insert(list.length, item)
    })

    const getKey = useMemoizedFn((index: number) => {
        return keyRef.current[index]
    })

    const getItemSchema = useMemoizedFn((index: number): ISchema => {
        if (isTuple) {
            return tupleSchemaRef.current![index]
        }
        return items as ISchema
    })

    return {
        isTuple,
        list: useMemo(() => Array.from({ length }), [length]),
        api: useMemo(() => ({
            push,
            insert,
            remove,
            move,
            replace,
            getKey,
            getItemSchema,
        }), []),
    } as const
}

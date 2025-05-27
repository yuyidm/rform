import type { ISchema, Scope } from '../interfaces'
import { emptyObjects } from '../const/emptyObjects'
import { isNormalizer } from './normalize'
import { isEmpty } from './object'

function defaultNormalize(e: any) {
    if (e?.target) {
        return e.target.value
    }
    return e
}

function defaultValidate() {
    return false
}

function defaultTransform(e: any) {
    return e
}

function validateFactory(fn: any, scope: Scope & { required: boolean }) {
    return async (val: any) => {
        if (scope.required) {
            const value = scope.getValue()
            if (value === undefined || value === null || value === '') {
                return 'This field is required'
            }
        }
        const error = await Promise.resolve(fn(val, scope))
        return isEmpty(error) ? false : error
    }
}

function normalizeFactory(fn: any, scope: Scope) {
    return (val: any) => {
        return fn(val, scope)
    }
}

function transformFactory(fn: any, scope: Scope) {
    return (val: any) => {
        return fn(val, scope)
    }
}

function getWrapperDecorator(
    schema: ISchema,
    scope: Scope,
) {
    const isWrapper = ['array', 'object', 'void'].includes(schema.type)
    return resolveReactComponent(schema.decorator ?? (!isWrapper ? 'FormItem' : emptyObjects.Wrapper), scope)
}

export function resolveSchema(
    schema: ISchema,
    scope: Scope,
) {
    const title = resolveValue(schema.title ?? '', scope)
    const description = resolveValue(schema.description ?? '', scope)
    const required = resolveValue(schema.required ?? false, scope)
    const disabled = resolveValue(schema.disabled ?? false, scope)
    const hidden = resolveValue(schema.hidden ?? false, scope)
    const visible = resolveValue(schema.visible ?? true, scope)

    const decoratorProps = {
        type: schema.type,
        label: title,
        required,
        ...resolveValue(schema['decorator-props'] ?? emptyObjects.obj, scope),
    }

    const componentProps = {
        ...resolveValue(schema['component-props'] ?? emptyObjects.obj, scope),
    }

    return {
        ...schema,
        title,
        description,
        decorator: getWrapperDecorator(schema, scope),
        decoratorProps,

        component: resolveReactComponent(schema.component ?? emptyObjects.Wrapper, scope),
        componentProps,

        required,
        visible,
        hidden,
        disabled,

        normalize: normalizeFactory(schema.normalize ?? defaultNormalize, scope),
        transform: transformFactory(schema.transform ?? defaultTransform, scope),
        validate: validateFactory(schema.validate ?? defaultValidate, { ...scope, required }),

        properties: (schema.properties ?? emptyObjects.obj as ISchema['properties'])!,
        items: (schema.items ?? emptyObjects.arr as ISchema['items'])!,
    }
}

function resolveValue(input: any, scope: Scope) {
    if (typeof input !== 'function')
        return input

    try {
        const result = input(scope.value, scope)
        if (typeof result === 'function') {
            return result // ctx => fn(value)
        }
        return result // 是 ctx => 值 的形式
    }
    catch {
        return input
    }
}

function resolveReactComponent(input: any, scope: Scope) {
    let Comp = input
    if (typeof input === 'string') {
        Comp = scope.components[input] ?? emptyObjects.Wrapper
    }
    else if (isNormalizer(input)) {
        const result = resolveValue(input, scope)
        if (typeof result === 'string') {
            Comp = resolveReactComponent(result, scope)
        }
        else {
            Comp = result
        }
    }
    Comp.displayName = Comp.displayName || Comp.name || 'FormInput'
    return Comp
}

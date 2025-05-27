export type SchemaTypes =
    | 'string'
    | 'number'
    | 'boolean'
    | 'object'
    | 'array'
    | 'void'

export interface Scope {
    value: any
    deps: any[]
    error: string | false
    components: Record<string, any>
    getValue: () => any
    getValues: () => Record<string, any>
    setValue: (val: any) => void
}

export type Normalize = (value: any, scope: Scope) => any
export type Validate = (value: any, scope: Scope) => (string | false) | Promise<string | false>
export type Transform = (value: any, scope: Scope) => Record<string, any>

export type WithFn<P> = P | ((value: any, scope: Scope) => P)

export interface ISchema<T = any> {
    'type': SchemaTypes
    'default'?: T
    'properties'?: Record<string, ISchema<any>>
    'items'?: ISchema | ISchema[]
    'deps'?: string[]

    'title'?: WithFn<React.ReactNode>
    'description'?: WithFn<React.ReactNode>
    'decorator-props'?: WithFn<Record<string, any>>
    'component-props'?: WithFn<Record<string, any>>
    'visible'?: WithFn<boolean>
    'hidden'?: WithFn<boolean>
    'required'?: WithFn<boolean>
    'disabled'?: WithFn<boolean>

    'decorator'?: WithFn<React.FC<any> | string>
    'component'?: WithFn<React.FC<any> | string>
    'normalize'?: Normalize
    'validate'?: Validate
    'transform'?: Transform
}

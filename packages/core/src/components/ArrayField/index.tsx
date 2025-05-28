import type { FromPath } from '../../helper/path'
import type { ISchema } from '../../interfaces'
import { memo, useMemo } from 'react'
import { ArrayItemIndexContext, ArrayItemsContext } from '../../const/context'
import { compareByPath } from '../../helper/compareByPath'
import { isEmpty } from '../../helper/object'
import { useArrayField } from '../../hooks/useArrayField'
import { useDefaultValue } from '../../hooks/useDefaultValue'
import { useField } from '../../hooks/useField'
import SchemaField from '../SchemaField'

interface ArrayFieldProps {
    schema: ISchema
    path: FromPath
}

const ArrayField: React.FC<ArrayFieldProps> = ({
    schema,
    path,
}) => {
    useDefaultValue(path, schema)
    const { list, api } = useArrayField(path, schema)
    const {
        properties,
        decorator: Decorator,
        decoratorProps,
        component: Component,
        componentProps,
    } = useField(path, schema)

    const expanded = useMemo(() => {
        return !isEmpty(properties) && Object.keys(properties).map((key) => {
            return (
                <SchemaField
                    key={key}
                    path={path.push(key)}
                    schema={properties[key]}
                />
            )
        })
    }, [])

    return (
        <Decorator {...decoratorProps}>
            <ArrayItemsContext.Provider value={api}>
                <Component {...componentProps}>
                    {list.map((_, index) => (
                        <ArrayItemIndexContext.Provider
                            key={api.getKey(index)}
                            value={index}
                        >
                            <SchemaField
                                schema={api.getItemSchema(index)}
                                path={path.push(index)}
                            />
                        </ArrayItemIndexContext.Provider>
                    ))}
                    {expanded}
                </Component>
            </ArrayItemsContext.Provider>
        </Decorator>
    )
}

const MemoArrayField = memo(ArrayField, compareByPath)

MemoArrayField.displayName = 'ArrayField'

export default MemoArrayField

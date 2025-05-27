import type { Path } from '@formily/path'
import type { ISchema } from '../../interfaces'
import { memo } from 'react'
import { compareByPath } from '../../helper/compareByPath'
import { isEmpty } from '../../helper/object'
import { useDefaultValue } from '../../hooks/useDefaultValue'
import { useField } from '../../hooks/useField'
import SchemaField from '../SchemaField'

export interface ObjectFieldProps {
    schema: ISchema
    path: Path
}

const ObjectField: React.FC<ObjectFieldProps> = ({
    schema,
    path,
}) => {
    useDefaultValue(path, schema)
    const {
        properties,
        component: Component,
        componentProps,
        decorator: Decorator,
        decoratorProps,
    } = useField(path, schema)

    return (
        <Decorator {...decoratorProps}>
            {
                !isEmpty(properties)
                    ? Object.keys(properties).map((key) => {
                            const fieldPath = path.push(key)
                            return (
                                <Component
                                    {...componentProps}
                                    key={fieldPath.toString()}
                                >
                                    <SchemaField
                                        key={fieldPath.toString()}
                                        path={fieldPath}
                                        schema={properties[key]}
                                    />
                                </Component>
                            )
                        })
                    : <Component {...componentProps} />
            }
        </Decorator>
    )
}

const MemoObjectField = memo(ObjectField, compareByPath)

MemoObjectField.displayName = 'ObjectField'

export default MemoObjectField

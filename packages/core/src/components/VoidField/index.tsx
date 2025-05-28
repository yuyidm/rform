import type { FromPath } from '../../helper/path'
import type { ISchema } from '../../interfaces'
import { memo } from 'react'
import { compareByPath } from '../../helper/compareByPath'
import { isEmpty } from '../../helper/object'
import { useField } from '../../hooks/useField'
import SchemaField from '../SchemaField'

export interface VoidFieldProps {
    schema: ISchema
    path: FromPath
}

const VoidField: React.FC<VoidFieldProps> = ({
    path,
    schema,
}) => {
    const {
        properties,
        component: Component,
        componentProps,
        decorator: Decorator,
        decoratorProps,
    } = useField(path, schema)

    return (
        <Decorator {...decoratorProps}>
            {!isEmpty(properties)
                ? Object.keys(properties).map((name) => {
                        return (
                            <Component
                                {...componentProps}
                                key={name}
                            >
                                <SchemaField
                                    key={name}
                                    path={path}
                                    schema={properties[name]}
                                />
                            </Component>
                        )
                    })
                : <Component {...componentProps} />}

        </Decorator>
    )
}

const MemoVoidField = memo(VoidField, compareByPath)

MemoVoidField.displayName = 'VoidField'

export default MemoVoidField

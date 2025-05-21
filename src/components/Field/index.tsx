import type { Path } from '@formily/path'
import type { ISchema } from '@/interfaces'
import { memo } from 'react'
import { compareByPath } from '@/helper/compareByPath'
import { useDefaultValue } from '@/hooks/useDefaultValue'
import { useField } from '@/hooks/useField'
import { useSchema } from '@/hooks/useSchema'

export interface FieldProps {
    schema: ISchema
    path: Path
}

const Field: React.FC<FieldProps> = ({
    schema,
    path,
}) => {
    useSchema(path, schema)
    useDefaultValue(path, schema)

    const {
        value,
        onChange,
        decorator: Decorator,
        decoratorProps,
        component: Component,
        componentProps,
        status,
        error,
        description,
        disabled,
    } = useField(path, schema)

    return (
        <Decorator
            htmlFor={path.toString()}
            validateStatus={status}
            help={error}
            extra={description}
            disabled={disabled}
            {...decoratorProps}
        >
            <Component
                id={path.toString()}
                disabled={disabled}
                status={status}
                {...componentProps}
                value={value}
                onChange={onChange}
            />
        </Decorator>
    )
}

const MemoField = memo(Field, compareByPath)
MemoField.displayName = 'Field'

export default MemoField

import type { ISchema } from '../../interfaces'
import { Path } from '@formily/path'
import React, { memo } from 'react'
import { compareByPath } from '../../helper/compareByPath'
import ArrayField from '../ArrayField'
import Field from '../Field'
import ObjectField from '../ObjectField'
import VoidField from '../VoidField'

interface SchemaFieldProps {
    schema: ISchema
    path?: Path
}

const defaultProps = {
    path: Path.parse(),
}

const SchemaField: React.FC<SchemaFieldProps> = ({
    schema,
    path = defaultProps.path,
}) => {
    switch (schema.type) {
        case 'object':
            return <ObjectField path={path} schema={schema} />
        case 'array':
            return <ArrayField path={path} schema={schema} />
        case 'void':
            return <VoidField path={path} schema={schema} />
        default:
            return <Field path={path} schema={schema} />
    }
}

const MemoSchemaField = memo(SchemaField, compareByPath)

MemoSchemaField.displayName = 'SchemaField'

export default MemoSchemaField

import type { StoreApi, UseBoundStore } from 'zustand'
import type { State } from '../../helper/createFormStore'
import React, { memo } from 'react'
import { FormContext } from '../../const/context'
import { useForm } from '../../hooks/useForm'
import SchemaField from '../SchemaField'

interface FormProps {
    form?: UseBoundStore<StoreApi<State>>
}

const Form: React.FC<FormProps> = ({
    form,
}) => {
    const formStore = useForm(form)
    return (
        <FormContext.Provider value={formStore}>
            <SchemaField schema={formStore.getInitialState().schema} />
        </FormContext.Provider>
    )
}

const MemoForm = memo(Form)
MemoForm.displayName = 'Form'

export default MemoForm

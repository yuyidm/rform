import { createFormStore, Form } from '@r-form/core'
import { ArrayItems, FormItem } from '@r-form/widget'
import { Button, DatePicker, Input, InputNumber, Radio, Space } from 'antd'
import React from 'react'
import { formScheme } from './formScheme'
import './App.css'
import '@r-form/widget/es/index.css'

function App() {
    const formStore = createFormStore({
        schema: formScheme,
        components: {
            FormItem,
            ArrayItems,
            'ArrayItems.Addition': ArrayItems.Addition,
            'ArrayItems.Up': ArrayItems.Up,
            'ArrayItems.Down': ArrayItems.Down,
            'ArrayItems.Remove': ArrayItems.Remove,
            InputNumber,
            Radio,
            'Radio.Group': Radio.Group,
            Input,
            'Input.TextArea': Input.TextArea,
            DatePicker,
            'DatePicker.RangePicker': DatePicker.RangePicker,
            Space,
            Button,
        },
    })

    return (
        <div>
            <Button onClick={() => console.log(formStore.getState().values)}>
                values
            </Button>

            <Button onClick={() => console.log(formStore.getState())}>
                state
            </Button>

            <Button onClick={() => formStore.getState().submit().then(console.log)}>
                submit
            </Button>

            <Form form={formStore} />
        </div>
    )
}

export default App

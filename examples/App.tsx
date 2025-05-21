import { Button, DatePicker, Input, InputNumber, Radio, Space } from 'antd'
import { createFormStore, Form } from '@/index'
import { ArrayItems, FormItem } from '@/widgets'

import { formScheme } from './formScheme'
import './App.css'

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

            <Button onClick={() => console.log(formStore.getState().fields)}>
                fields
            </Button>

            <Button onClick={() => console.log(formStore.getState())}>
                state
            </Button>

            <Form form={formStore} />
        </div>
    )
}

export default App

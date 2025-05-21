import type { ISchema } from '@/interfaces'
import dayjs from 'dayjs'

export const formScheme: ISchema = {
    type: 'object',
    properties: {
        'name': {
            title: '姓名',
            type: 'string',
            required: true,
            default: 'nickname',
            component: 'Input',
            validate: (value) => {
                if (value.length < 2) {
                    return '姓名不能少于两个字'
                }
                if (value.length > 10) {
                    return '姓名不能超过十个字'
                }
                return false
            },
        },
        'age': {
            'title': '年龄',
            'type': 'number',
            'required': true,
            'default': '18',
            'component': 'InputNumber',
            'component-props': {
                min: 0,
                max: 100,
            },
        },
        'gender': {
            'title': '性别',
            'type': 'string',
            'required': true,
            'default': 'male',
            'component': 'Radio.Group',
            'component-props': {
                options: [
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
                ],
            },
        },
        'tuple': {
            'type': 'array',
            'default': ['name', '18', 'male'],
            'decorator': 'FormItem',
            'title': '元组',
            'component-props': {
                direction: 'vertical',
                style: {
                    display: 'flex',
                },
            },
            'items': [
                {
                    type: 'void',
                    decorator: 'Space',
                    properties: {
                        name: {
                            'required': true,
                            'type': 'string',
                            'title': '姓名',
                            'component': 'Input',
                            'component-props': {
                                placeholder: '请输入姓名',
                            },
                        },
                        up: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Up',
                        },
                        down: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Down',
                        },
                    },
                },
                {
                    type: 'void',
                    decorator: 'Space',
                    properties: {
                        age: {
                            'required': true,
                            'type': 'number',
                            'title': '年龄',
                            'component': 'InputNumber',
                            'component-props': {
                                min: 0,
                                max: 100,
                            },
                        },
                        up: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Up',
                        },
                        down: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Down',
                        },
                    },
                },
                {
                    type: 'void',
                    decorator: 'Space',
                    properties: {
                        sex: {
                            'required': true,
                            'type': 'string',
                            'title': '性别',
                            'component': 'Radio.Group',
                            'component-props': {
                                options: [
                                    { label: '男', value: 'male' },
                                    { label: '女', value: 'female' },
                                ],
                            },
                        },
                        up: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Up',
                        },
                        down: {
                            type: 'void',
                            decorator: 'FormItem',
                            component: 'ArrayItems.Down',
                        },
                    },
                },
            ],
        },
        'hobbies': {
            title: '数组',
            type: 'array',
            required: true,
            default: ['eat', 'sleep'],
            decorator: 'FormItem',
            component: 'ArrayItems',
            items: {
                type: 'void',
                decorator: 'Space',
                properties: {
                    name: {
                        'type': 'string',
                        'decorator': 'FormItem',
                        'default': '爱好',
                        'component': 'Input',
                        'component-props': {
                            placeholder: '请输入爱好',
                        },
                    },
                    up: {
                        type: 'void',
                        decorator: 'FormItem',
                        component: 'ArrayItems.Up',
                    },
                    down: {
                        type: 'void',
                        decorator: 'FormItem',
                        component: 'ArrayItems.Down',
                    },
                    del: {
                        type: 'void',
                        decorator: 'FormItem',
                        component: 'ArrayItems.Remove',
                    },
                },
            },
            properties: {
                add: {
                    type: 'void',
                    decorator: 'FormItem',
                    component: 'ArrayItems.Addition',
                },
            },
        },
        'dateRange': {
            type: 'object',
            decorator: 'Space',
            properties: {
                startTime: {
                    'title': '开始时间',
                    'type': 'string',
                    'required': true,
                    'component': 'DatePicker',
                    'component-props': {
                        format: 'YYYY-MM-DD HH:mm:ss',
                    },
                },
                endTime: {
                    'title': '结束时间',
                    'type': 'string',
                    'required': true,
                    'component': 'DatePicker',
                    'component-props': {
                        format: 'YYYY-MM-DD HH:mm:ss',
                    },
                    'deps': ['dateRange.startTime'],
                },
            },
        },
        '[rang1, rang2]': {
            title: '解构',
            type: 'string',
            component: 'DatePicker.RangePicker',
            required: true,
            normalize: (v) => {
                return v.map((item: any) => item.format('YYYY-MM-DD HH:mm:ss'))
            },
            transform: (v) => {
                return v && v.length && v.map((item: string) => dayjs(item))
            },
        },
    },
}

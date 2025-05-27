import { ArrayItemIndexContext, ArrayItemsContext } from '@r-form/core'
import { Button } from 'antd'
import React, { memo, useContext } from 'react'
import Wrapper from '../Wrapper'

interface ArrayItemsProps {
    children: React.ReactNode
}

const Addition = memo(() => {
    const { push } = useContext(ArrayItemsContext)
    return (
        <Button type="dashed" onClick={() => push(undefined)}>
            新增
        </Button>
    )
})

const Up = memo(() => {
    const index = useContext(ArrayItemIndexContext)
    const { move } = useContext(ArrayItemsContext)
    return (
        <Button onClick={() => move(index, index - 1)}>上移</Button>
    )
})

const Down = memo(() => {
    const index = useContext(ArrayItemIndexContext)
    const { move } = useContext(ArrayItemsContext)
    return (
        <Button onClick={() => move(index, index + 1)}>下移</Button>
    )
})

const Remove = memo(() => {
    const index = useContext(ArrayItemIndexContext)
    const { remove } = useContext(ArrayItemsContext)
    return (
        <Button onClick={() => remove(index)}>删除</Button>
    )
})

type ArrayItemsComponent = React.FC<ArrayItemsProps> & {
    Addition: typeof Addition
    Down: typeof Down
    Up: typeof Up
    Remove: typeof Remove
}

const ArrayItems: React.FC<ArrayItemsProps> = ({
    children,
}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

const MemoArrayItems = memo(ArrayItems) as unknown as ArrayItemsComponent

MemoArrayItems.Addition = Addition
MemoArrayItems.Up = Up
MemoArrayItems.Down = Down
MemoArrayItems.Remove = Remove

MemoArrayItems.displayName = 'ArrayItems'

export default MemoArrayItems

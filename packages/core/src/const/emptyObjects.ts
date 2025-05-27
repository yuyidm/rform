// 空对象
const obj = {}
const arr = [] as []
function noop() {}

export const emptyObjects = {
    obj,
    arr,
    noop,
    Wrapper: (props: any) => props?.children,
}

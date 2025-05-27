declare module '*.module.css' {
    const classes: CSSModuleClasses
    export default classes
}
declare module '*.module.less' {
    const classes: CSSModuleClasses
    export default classes
}

declare module '*.css' {
    const content: string
    export default content
}

declare module '*.less' {
    const content: string
    export default content
}

import { memo } from 'react'

const Wrapper = memo(({ children }: { children?: React.ReactNode }) => {
    return <>{children}</>
})

Wrapper.displayName = 'Wrapper'

export default Wrapper

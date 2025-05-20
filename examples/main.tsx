import React from 'react'
import { createRoot } from 'react-dom/client'
import { scan } from 'react-scan'
import App from './App.tsx'

import './index.css'

async function main() {
    scan({
        enabled: true,

    })
    createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}

main()

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Web3Provider} from "@/Web3Provider.tsx";
import {Router} from "@/Router.tsx";
import {ThemeProvider, Toaster} from "@ethsign/ui";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
        <ThemeProvider defaultTheme={'light'} storageKey={'theme'}>
            <Router/>
            <Toaster/>
        </ThemeProvider>
    </Web3Provider>
  </React.StrictMode>,
)

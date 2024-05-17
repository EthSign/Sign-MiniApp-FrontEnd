import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from '@/Router.tsx';
import { ThemeProvider, Toaster } from '@ethsign/ui';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const mainifestUrl = 'https://app.ethsign.xyz/manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={mainifestUrl}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/sign-bot'
      }}
    >
      <ThemeProvider defaultTheme={'light'} storageKey={'theme'}>
        <Router />
        <Toaster />
      </ThemeProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

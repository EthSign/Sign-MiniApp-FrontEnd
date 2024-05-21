import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from '@/Router.tsx';
import { ThemeProvider, Toaster } from '@ethsign/ui';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

const manifestUrl = 'https://app.ethsign.xyz/manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/sign-bot'
      }}
    >
      <ThemeProvider defaultTheme={'dark'} storageKey={'theme'}>
        <Router />
        <Toaster />
      </ThemeProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

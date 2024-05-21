import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from '@/Router.tsx';
import { ThemeProvider, Toaster } from '@ethsign/ui';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';
import { ENVS } from '@/constants/config.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

WebApp.ready();

const mainifestUrl = 'https://app.ethsign.xyz/manifest.json';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={mainifestUrl}
      actionsConfiguration={{
        twaReturnUrl: ENVS.TG_APP_LINK as any
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={'dark'} storageKey={'theme'}>
          <Router />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  </React.StrictMode>
);

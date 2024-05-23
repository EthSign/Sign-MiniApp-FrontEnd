import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from '@/Router.tsx';
import { ThemeProvider, Toaster } from '@ethsign/ui';
import WebApp from '@twa-dev/sdk';
import { ENVS } from '@/constants/config.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LotteryInfoProvider } from './providers/LotteryInfoProvider';
import { TonProvider } from '@/core/providers/ton';

WebApp.ready();

WebApp.setBackgroundColor('#05051E');
WebApp.setHeaderColor('#05051E');

const manifestUrl = 'https://app.ethsign.xyz/manifest.json';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonProvider
      config={{
        manifestUrl: manifestUrl,
        actionsConfiguration: {
          twaReturnUrl: ENVS.TG_APP_LINK as any
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme={'dark'} storageKey={'theme'}>
          <LotteryInfoProvider>
            <Router />
            <Toaster />
          </LotteryInfoProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </TonProvider>
  </React.StrictMode>
);

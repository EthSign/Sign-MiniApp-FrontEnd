import { Outlet, useNavigate } from 'react-router-dom';
import { initTelegramApp, isTelegramApp } from '@/utils/common.ts';
import { useDebug } from '@/hooks/useDebug.tsx';
import { UserInfoProvider, useUserInfo } from '@/providers/UserInfoProvider';
import { useEffect, useRef } from 'react';

const TGAPP = () => {
  const isTg = isTelegramApp();
  const { debug } = useDebug();
  console.log(debug, 'debug');

  useEffect(() => {
    initTelegramApp();
  }, []);

  if (!isTg && !debug) {
    return (
      <div className="flex h-screen w-screen items-center justify-center text-white">
        <h1>Please open in Telegram</h1>
      </div>
    );
  }

  return (
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  );
};

function App() {
  const { user } = useUserInfo();

  const redirected = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirected.current && user?.code) {
      navigate('/attest', { replace: true });
      redirected.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[linear-gradient(114deg,rgba(0,178,255,0.52)-0.81%,#9997FF_65.22%),linear-gradient(114deg,#00B2FF_-0.81%,#9997FF_65.22%)]">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default TGAPP;

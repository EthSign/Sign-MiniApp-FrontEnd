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
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#05051E] text-white">
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default TGAPP;

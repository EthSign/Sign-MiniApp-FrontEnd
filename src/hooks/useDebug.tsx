import eruda from 'eruda';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

export const useErudaDebugger = () => {
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get('debug');

  const isLocalDebug = window.location.href.includes('localhost');

  const [debug] = useLocalStorage('debug', isDebug || isLocalDebug);

  useEffect(() => {
    if (debug) {
      eruda.init();
    }
  }, [debug]);

  return {
    debug
  };
};

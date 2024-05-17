import { Outlet, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import eruda from 'eruda';

function App() {
  const [searchParams] = useSearchParams();
  const isDebug = searchParams.get('debug');
  const debug = localStorage.getItem('debug');

  useEffect(() => {
    if (isDebug) {
      if (!debug) {
        localStorage.setItem('debug', isDebug);
      }
      eruda.init();
    }
  }, [isDebug, debug]);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;

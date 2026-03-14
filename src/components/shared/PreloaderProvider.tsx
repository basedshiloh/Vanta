'use client';

import { ReactNode, useCallback, useState } from 'react';
import Preloader from './Preloader';

interface PreloaderProviderProps {
  children: ReactNode;
}

const PreloaderProvider = ({ children }: PreloaderProviderProps) => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {children}
    </>
  );
};

export default PreloaderProvider;

import { Suspense } from 'react';
import { Fallback } from './fallback';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
    </Suspense>
  );
};
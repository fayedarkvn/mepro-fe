import { Suspense } from 'react';
import { Fallback } from 'src/components/fallback';

export const AppProvider = ({ children }: { children: React.ReactNode; }) => {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
    </Suspense>
  );
};

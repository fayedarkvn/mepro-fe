import { Suspense } from 'react';
import { SuspenseFallback } from 'src/components/fallback/suspense.fallback';

export function AppBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      {children}
    </Suspense>
  );
}

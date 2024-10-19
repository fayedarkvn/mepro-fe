import { RouterProvider } from '@tanstack/react-router';
import { AppBoundary } from './boundary';
import { AppProvider } from './provider';
import { router } from './router';

export const App = () => {
  return (
    <AppBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AppBoundary>
  );
};

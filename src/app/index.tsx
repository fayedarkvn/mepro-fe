import { RouterProvider } from '@tanstack/react-router';
import { AppBoundary } from './boundary';
import { AppProvider } from './provider';
import { router } from './router';
import '@ant-design/v5-patch-for-react-19';

export function App() {
  return (
    <AppBoundary>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AppBoundary>
  );
}

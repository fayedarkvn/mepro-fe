import { RouterProvider } from '@tanstack/react-router';
import { AppProvider } from './provider';
import { router } from './router';

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

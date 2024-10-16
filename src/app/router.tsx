import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import { TSRDevtools } from 'src/components/tsr-devtools';
import { NotFound } from '../components/not-found';
import { authRoute } from './auth/auth.route';
import { dashboardRoute } from './dashboard/dashboard.route';
import { indexPageRoute } from './index-page/index-page.route';
import { infomationalRoute } from './informational/informational.route';
import { publicProfileRoute } from './public-profile/public-profile.route';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TSRDevtools />
    </>
  ),
  notFoundComponent: NotFound,
});


export const routeTree = rootRoute.addChildren([
  indexPageRoute,
  infomationalRoute,
  dashboardRoute,
  authRoute,
  publicProfileRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

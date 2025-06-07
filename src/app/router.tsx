import { createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import { NotFound } from '../components/error/not-found';
import { TSRDevtools } from '../components/tsr-devtools';
import { authRouteTree } from './routes/auth.route';
import { dashboardRouteTree } from './routes/dashboard.route';
import { indexPageRouteTree } from './routes/index-page.route';
import { informationalRouteTree } from './routes/informational.route';
import { publicProfileRouteTree } from './routes/public-profile.route';

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
  indexPageRouteTree,
  authRouteTree,
  dashboardRouteTree,
  publicProfileRouteTree,
  informationalRouteTree,
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

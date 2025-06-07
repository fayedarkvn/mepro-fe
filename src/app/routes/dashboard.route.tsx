import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../app/router';
import { DashboardLayout } from '@/features/dashboard/layout';
import { DashboardProfilePage } from '@/features/dashboard/profile.page';

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardLayout,
});

const dashboardProfileRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/profile',
  component: DashboardProfilePage,
});

export const dashboardRouteTree = dashboardRoute.addChildren([
  dashboardProfileRoute,
]);

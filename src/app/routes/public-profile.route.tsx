import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { PublicProfileIndexPage } from '../../features/public-profile/index.page';
import { PublicProfileLayout } from '../../features/public-profile/layout';

const publicProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/u',
  component: PublicProfileLayout,
});

const profileRoute = createRoute({
  getParentRoute: () => publicProfileRoute,
  path: '/$uid',
  component: PublicProfileIndexPage,
});

export const publicProfileRouteTree = publicProfileRoute.addChildren([
  profileRoute,
]);

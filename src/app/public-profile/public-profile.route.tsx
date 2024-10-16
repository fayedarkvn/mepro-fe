import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { PublicProfileIndexPage } from './public-profile-index';
import { PublicProfileLayout } from './public-profile.layout';

export const profileRoute = createRoute({
  getParentRoute: () => _publicProfileRoute,
  path: '/$uid',
  component: PublicProfileIndexPage,
});

const _publicProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/u',
  component: PublicProfileLayout,
});

export const publicProfileRoute = _publicProfileRoute.addChildren([
  profileRoute,
]);

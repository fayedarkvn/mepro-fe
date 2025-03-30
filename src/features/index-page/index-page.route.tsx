import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../app/router';
import { LandingPage } from './landing-page/landing-page';

export const indexPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../router';
import { AuthLayout } from '../../features/auth/layout';
import { LoginPage } from '../../features/auth/login.page';
import { SignupPage } from '../../features/auth/signup.page';

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  component: AuthLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/login',
  component: LoginPage,
});

const signupRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/signup',
  component: SignupPage,
});

export const authRouteTree = authRoute.addChildren([
  loginRoute,
  signupRoute,
]);

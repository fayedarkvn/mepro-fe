import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IndexPage } from './index-page/index-page';
import { NotFound } from './not-found';

const AuthRoutes = lazy(() => import('./auth/auth.route'));
const DashboardRoutes = lazy(() => import('./dashboard/dashboard.route'));
const InformationalRoutes = lazy(() => import('./informational/informational.route'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route path="/infomational/*" element={<InformationalRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

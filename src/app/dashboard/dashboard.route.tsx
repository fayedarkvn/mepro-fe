import { Route, Routes } from 'react-router-dom';
import { NotFound } from '../not-found';
import { DashboardLayout } from './dashboard.layout';

export function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<div>dashboard</div>} />
        <Route path="profile" element={<div>my profile</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default DashboardRoutes;

import { Outlet } from '@tanstack/react-router';

export function PublicProfileLayout() {
  return (
    <div>
      <h3>Public Profile</h3>
      <Outlet />
    </div>
  );
}

import { Outlet } from 'react-router-dom';

export  function AuthLayout() {
  return (
    <div>
      <h2>Auth</h2>
      <Outlet />
    </div>
  )
}

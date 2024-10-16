import { Outlet } from "@tanstack/react-router";

export  function AuthLayout() {
  return (
    <div>
      <h2>Auth</h2>
      <Outlet />
    </div>
  )
}

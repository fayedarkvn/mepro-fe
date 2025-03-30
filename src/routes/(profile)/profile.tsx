import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(profile)/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2>Profile</h2>
      <Outlet />
    </div>
  );
}

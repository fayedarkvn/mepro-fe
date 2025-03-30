import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "src/features/auth/login";

export const Route = createFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}

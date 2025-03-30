import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/features/auth/signup";

export const Route = createFileRoute("/(auth)/_auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupPage />;
}

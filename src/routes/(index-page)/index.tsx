import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "src/features/index-page/landing-page/landing-page";

export const Route = createFileRoute("/(index-page)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}

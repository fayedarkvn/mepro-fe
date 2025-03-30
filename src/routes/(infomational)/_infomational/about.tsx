import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "src/features/informational/about";

export const Route = createFileRoute("/(infomational)/_infomational/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AboutPage />;
}

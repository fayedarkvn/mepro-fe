import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(profile)/profile/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(profile)/profile/$id/"!</div>;
}

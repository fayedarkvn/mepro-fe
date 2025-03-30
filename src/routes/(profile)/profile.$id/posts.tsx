import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(profile)/profile/$id/posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(profile)/profile/$id/posts"!</div>;
}

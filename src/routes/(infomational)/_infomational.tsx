import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(infomational)/_infomational")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(infomational)/_layout"!</div>;
}

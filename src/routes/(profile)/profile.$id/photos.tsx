import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(profile)/profile/$id/photos')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(profile)/profile/$id/photos"!</div>;
}

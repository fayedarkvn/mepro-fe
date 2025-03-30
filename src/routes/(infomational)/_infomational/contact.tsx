import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/features/informational/contact";

export const Route = createFileRoute("/(infomational)/_infomational/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContactPage />;
}

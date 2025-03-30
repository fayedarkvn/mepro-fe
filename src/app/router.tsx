import { createRouter } from "@tanstack/react-router";
import { NotFound } from "src/components/error/not-found";
import { routeTree } from "src/route-tree.gen";

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

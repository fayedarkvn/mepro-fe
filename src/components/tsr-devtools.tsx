import { lazy, Suspense } from "react";

const TanStackRouterDevtools = lazy(async () => {
  const module = await import("@tanstack/router-devtools");
  return { default: module.TanStackRouterDevtools };
});

export function TSRDevtools() {
  return (
    <Suspense>
      {import.meta.env.MODE === "production"
        ? null
        : <TanStackRouterDevtools initialIsOpen={false} />}
    </Suspense>
  );
}

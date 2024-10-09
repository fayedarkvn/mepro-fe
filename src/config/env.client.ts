import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_PUBLIC_",
  client: {
    VITE_PUBLIC_HELLO: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
});

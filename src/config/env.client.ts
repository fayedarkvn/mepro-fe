import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export let envError: Error | null = null;

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_APP_API_URL: z.string().url(),
  },
  runtimeEnv: import.meta.env,
  onValidationError(error) {
    envError = error;
    console.error(error);
    return null as never;
  }
});

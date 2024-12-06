import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_API_URL: z.string().url(),
    VITE_GOOGLE_OAUTH_CLIENT_ID: z.string(),
  },
  runtimeEnv: import.meta.env,
});

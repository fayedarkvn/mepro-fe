/// <reference types="vite/client" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const envDir = './env';
  const env = loadEnv(mode, envDir);

  return {
    plugins: [react(), tsconfigPaths()],
    envDir,
    root: './',
    server: {
      port: Number(env.VITE_APP_PORT) || undefined,
    },
  };
});

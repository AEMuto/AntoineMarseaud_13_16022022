import { defineConfig } from 'vite';
import react from 'vite-preset-react';
// @ts-ignore
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
});

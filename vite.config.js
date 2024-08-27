import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(() => {
  return {
    define: {
      global: "globalThis",
    },
    build: {
      sourcemap: true,
      outDir: "build",
    },
    resolve: {
      alias: {
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        buffer: "buffer",
        url: "url",
      },
    },
    plugins: [
      nodePolyfills({
        crypto: true,
        stream: true,
        buffer: true,
        url: true,
      }),
      react({
        jsxRuntime: "classic",
        jsxImportSource: "@emotion/react",
      }),
    ],
    server: {
      open: true,
      port: 3031,
    },
  };
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ["esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  entryPoints: ['src/index.ts'],
});
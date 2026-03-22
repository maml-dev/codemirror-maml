import {lezer} from "@lezer/generator/rollup"
import {nodeResolve} from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"

export default {
  input: "example/main.js",
  output: {
    file: "example/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    lezer(),
    typescript({
      declaration: false,
      declarationDir: undefined,
      outDir: "example",
    }),
  ]
}

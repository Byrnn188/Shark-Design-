import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import sass from 'rollup-plugin-sass'

const overrides = {
    compilerOptions: {declaration: true},
    exclude: [
    "src/**/*.test.tsx",
    "src/**/*.stories.tsx",
    "src/**/*.stories.mdx",
    "src/setupTests.ts",
  ]
}
const basicConfig = {
    input: 'src/index.tsx',
    plugins: [
        nodeResolve(),
        json(),
        commonjs(),
        typescript({tsconfigOverride: overrides}), //覆盖tsconfig.json里的部分选项
        sass({output: 'dist/index.css'}) //样式文件打包
    ],
    // external: ['react', 'react-dom', 'axios']
}

export default basicConfig